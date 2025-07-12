use candid::Principal;
use ic_cdk::api::time;
use uuid::Uuid;
use crate::types::Collaboration;
use crate::storage::{get_collaboration_by_id, save_collaboration, remove_collaboration, get_all_collaborations, get_project_by_id, save_project};
use crate::auth::require_authenticated;

pub fn add_collaborator(
    project_id: String,
    user_principal: Principal,
    contribution_percentage: u8,
    role: String,
) -> Result<Collaboration, String> {
    let caller = require_authenticated()?;
    
    let mut project = get_project_by_id(&project_id)
        .ok_or_else(|| "Project not found".to_string())?;

    // Only project owner can add collaborators
    if project.owner != caller {
        return Err("Only project owner can add collaborators".to_string());
    }

    if contribution_percentage > 100 {
        return Err("Contribution percentage cannot exceed 100%".to_string());
    }

    // Check if user is already a collaborator
    if project.collaborators.contains(&user_principal.to_string()) {
        return Err("User is already a collaborator".to_string());
    }

    let collaboration = Collaboration {
        id: Uuid::new_v4().to_string(),
        project_id: project_id.clone(),
        user_principal,
        contribution_percentage,
        role,
        joined_at: time(),
    };

    project.collaborators.push(user_principal.to_string());
    project.updated_at = time();

    save_collaboration(collaboration.clone());
    save_project(project);
    
    Ok(collaboration)
}

pub fn get_project_collaborators(project_id: String) -> Vec<Collaboration> {
    get_all_collaborations()
        .into_iter()
        .filter(|collaboration| collaboration.project_id == project_id)
        .collect()
}

pub fn remove_collaborator(project_id: String, collaboration_id: String) -> Result<(), String> {
    let caller = require_authenticated()?;
    
    let mut project = get_project_by_id(&project_id)
        .ok_or_else(|| "Project not found".to_string())?;

    // Only project owner can remove collaborators
    if project.owner != caller {
        return Err("Only project owner can remove collaborators".to_string());
    }

    let collaboration = get_collaboration_by_id(&collaboration_id)
        .ok_or_else(|| "Collaboration not found".to_string())?;

    if collaboration.project_id != project_id {
        return Err("Collaboration does not belong to this project".to_string());
    }

    // Remove from project collaborators list
    project.collaborators.retain(|c| c != &collaboration.user_principal.to_string());
    project.updated_at = time();

    remove_collaboration(&collaboration_id);
    save_project(project);
    
    Ok(())
}