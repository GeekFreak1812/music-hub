use candid::Principal;
use ic_cdk::api::time;
use crate::types::*;
use crate::{USERS, PROJECTS, NFTS, COLLABORATIONS, TRACKS};

pub fn get_user_by_principal(principal: Principal) -> Option<User> {
    USERS.with(|users| users.borrow().get(&principal))
}

pub fn save_user(user: User) {
    USERS.with(|users| {
        users.borrow_mut().insert(user.principal, user);
    });
}

pub fn get_project_by_id(id: &str) -> Option<Project> {
    PROJECTS.with(|projects| projects.borrow().get(id))
}

pub fn save_project(project: Project) {
    PROJECTS.with(|projects| {
        projects.borrow_mut().insert(project.id.clone(), project);
    });
}

pub fn get_all_projects() -> Vec<Project> {
    PROJECTS.with(|projects| {
        projects.borrow().iter().map(|(_, project)| project).collect()
    })
}

pub fn get_nft_by_id(id: &str) -> Option<NFT> {
    NFTS.with(|nfts| nfts.borrow().get(id))
}

pub fn save_nft(nft: NFT) {
    NFTS.with(|nfts| {
        nfts.borrow_mut().insert(nft.id.clone(), nft);
    });
}

pub fn get_all_nfts() -> Vec<NFT> {
    NFTS.with(|nfts| {
        nfts.borrow().iter().map(|(_, nft)| nft).collect()
    })
}

pub fn get_collaboration_by_id(id: &str) -> Option<Collaboration> {
    COLLABORATIONS.with(|collaborations| collaborations.borrow().get(id))
}

pub fn save_collaboration(collaboration: Collaboration) {
    COLLABORATIONS.with(|collaborations| {
        collaborations.borrow_mut().insert(collaboration.id.clone(), collaboration);
    });
}

pub fn remove_collaboration(id: &str) {
    COLLABORATIONS.with(|collaborations| {
        collaborations.borrow_mut().remove(id);
    });
}

pub fn get_all_collaborations() -> Vec<Collaboration> {
    COLLABORATIONS.with(|collaborations| {
        collaborations.borrow().iter().map(|(_, collaboration)| collaboration).collect()
    })
}

pub fn get_track_by_id(id: &str) -> Option<Track> {
    TRACKS.with(|tracks| tracks.borrow().get(id))
}

pub fn save_track(track: Track) {
    TRACKS.with(|tracks| {
        tracks.borrow_mut().insert(track.id.clone(), track);
    });
}

pub fn get_all_tracks() -> Vec<Track> {
    TRACKS.with(|tracks| {
        tracks.borrow().iter().map(|(_, track)| track).collect()
    })
}