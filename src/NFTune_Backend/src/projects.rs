use ic_cdk::api::time;
use uuid::Uuid;
use crate::types::{Project, Track, TrackStatus};
use crate::storage::{get_project_by_id, save_project, get_all_projects, save_track, get_all_tracks};
use crate::auth::require_authenticated;

pub fn create_project(name: String, description: Option<String>) -> Result<Project, String> {
    let owner = require_authenticated()?;
    
    let project = Project {
        id: Uuid::new_v4().to_string(),
        owner,
        name,
        description,
        collaborators: vec![],
        tracks: vec![],
        nfts: vec![],
        created_at: time(),
        updated_at: time(),
    };

    save_project(project.clone());
    Ok(project)
}

pub fn get_projects() -> Vec<Project> {
    get_all_projects()
}

pub fn get_project(id: String) -> Result<Project, String> {
    get_project_by_id(&id)
        .ok_or_else(|| "Project not found".to_string())
}

pub fn update_project(id: String, name: Option<String>, description: Option<String>) -> Result<Project, String> {
    let caller = require_authenticated()?;
    
    let mut project = get_project_by_id(&id)
        .ok_or_else(|| "Project not found".to_string())?;

    // Check if caller is the owner
    if project.owner != caller {
        return Err("Only project owner can update project".to_string());
    }

    if let Some(new_name) = name {
        project.name = new_name;
    }
    
    if let Some(new_description) = description {
        project.description = Some(new_description);
    }
    
    project.updated_at = time();
    save_project(project.clone());
    Ok(project)
}

pub fn add_track(project_id: String, name: String, ipfs_hash: String, duration: u64) -> Result<Track, String> {
    let caller = require_authenticated()?;
    
    let mut project = get_project_by_id(&project_id)
        .ok_or_else(|| "Project not found".to_string())?;

    // Check if caller is owner or collaborator
    if project.owner != caller && !project.collaborators.contains(&caller.to_string()) {
        return Err("Only project owner or collaborators can add tracks".to_string());
    }

    let track = Track {
        id: Uuid::new_v4().to_string(),
        project_id: project_id.clone(),
        name,
        ipfs_hash,
        duration,
        status: TrackStatus::Draft,
        created_at: time(),
    };

    project.tracks.push(track.id.clone());
    project.updated_at = time();
    
    save_track(track.clone());
    save_project(project);
    
    Ok(track)
}

pub fn get_project_tracks(project_id: String) -> Vec<Track> {
    get_all_tracks()
        .into_iter()
        .filter(|track| track.project_id == project_id)
        .collect()
}