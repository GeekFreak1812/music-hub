use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::{caller, id, query, update};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;
use std::borrow::Cow;
use std::cell::RefCell;
use uuid::Uuid;

mod types;
mod storage;
mod auth;
mod projects;
mod nfts;
mod collaborations;

use types::*;
use storage::*;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static USERS: RefCell<StableBTreeMap<Principal, User, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );

    static PROJECTS: RefCell<StableBTreeMap<String, Project, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
        )
    );

    static NFTS: RefCell<StableBTreeMap<String, NFT, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))),
        )
    );

    static COLLABORATIONS: RefCell<StableBTreeMap<String, Collaboration, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3))),
        )
    );

    static TRACKS: RefCell<StableBTreeMap<String, Track, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4))),
        )
    );
}

// Authentication
#[update]
fn register_user(name: Option<String>, email: String) -> Result<User, String> {
    auth::register_user(name, email)
}

#[query]
fn get_user() -> Result<User, String> {
    auth::get_user()
}

// Projects
#[update]
fn create_project(name: String, description: Option<String>) -> Result<Project, String> {
    projects::create_project(name, description)
}

#[query]
fn get_projects() -> Vec<Project> {
    projects::get_projects()
}

#[query]
fn get_project(id: String) -> Result<Project, String> {
    projects::get_project(id)
}

#[update]
fn update_project(id: String, name: Option<String>, description: Option<String>) -> Result<Project, String> {
    projects::update_project(id, name, description)
}

// Tracks
#[update]
fn add_track(project_id: String, name: String, ipfs_hash: String, duration: u64) -> Result<Track, String> {
    projects::add_track(project_id, name, ipfs_hash, duration)
}

#[query]
fn get_project_tracks(project_id: String) -> Vec<Track> {
    projects::get_project_tracks(project_id)
}

// NFTs
#[update]
fn create_nft(
    project_id: String,
    title: String,
    description: Option<String>,
    price: Option<u64>,
    royalty_percentage: u8,
    metadata_uri: String,
) -> Result<NFT, String> {
    nfts::create_nft(project_id, title, description, price, royalty_percentage, metadata_uri)
}

#[query]
fn get_nfts() -> Vec<NFT> {
    nfts::get_nfts()
}

#[query]
fn get_nft(id: String) -> Result<NFT, String> {
    nfts::get_nft(id)
}

#[query]
fn get_project_nfts(project_id: String) -> Vec<NFT> {
    nfts::get_project_nfts(project_id)
}

#[update]
fn mint_nft(id: String, token_id: String, contract_address: String) -> Result<NFT, String> {
    nfts::mint_nft(id, token_id, contract_address)
}

// Collaborations
#[update]
fn add_collaborator(
    project_id: String,
    user_principal: Principal,
    contribution_percentage: u8,
    role: String,
) -> Result<Collaboration, String> {
    collaborations::add_collaborator(project_id, user_principal, contribution_percentage, role)
}

#[query]
fn get_project_collaborators(project_id: String) -> Vec<Collaboration> {
    collaborations::get_project_collaborators(project_id)
}

#[update]
fn remove_collaborator(project_id: String, collaboration_id: String) -> Result<(), String> {
    collaborations::remove_collaborator(project_id, collaboration_id)
}

// System functions
#[query]
fn get_canister_id() -> Principal {
    id()
}

#[query]
fn get_caller() -> Principal {
    caller()
}

// Export Candid interface
ic_cdk::export_candid!();