use candid::{CandidType, Deserialize, Principal};
use ic_stable_structures::{BoundedStorable, Storable};
use serde::Serialize;
use std::borrow::Cow;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub principal: Principal,
    pub name: Option<String>,
    pub email: String,
    pub avatar_url: Option<String>,
    pub created_at: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Project {
    pub id: String,
    pub owner: Principal,
    pub name: String,
    pub description: Option<String>,
    pub collaborators: Vec<String>,
    pub tracks: Vec<String>,
    pub nfts: Vec<String>,
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Track {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub ipfs_hash: String,
    pub duration: u64,
    pub status: TrackStatus,
    pub created_at: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum TrackStatus {
    Draft,
    Recording,
    Mixing,
    Completed,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct NFT {
    pub id: String,
    pub project_id: String,
    pub creator: Principal,
    pub title: String,
    pub description: Option<String>,
    pub price: Option<u64>,
    pub royalty_percentage: u8,
    pub metadata_uri: String,
    pub token_id: Option<String>,
    pub contract_address: Option<String>,
    pub is_minted: bool,
    pub is_listed: bool,
    pub opensea_url: Option<String>,
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Collaboration {
    pub id: String,
    pub project_id: String,
    pub user_principal: Principal,
    pub contribution_percentage: u8,
    pub role: String,
    pub joined_at: u64,
}

// Implement Storable for stable storage
impl Storable for User {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(&bytes).unwrap()
    }
}

impl BoundedStorable for User {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for Project {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(&bytes).unwrap()
    }
}

impl BoundedStorable for Project {
    const MAX_SIZE: u32 = 2048;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for NFT {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(&bytes).unwrap()
    }
}

impl BoundedStorable for NFT {
    const MAX_SIZE: u32 = 2048;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for Collaboration {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(&bytes).unwrap()
    }
}

impl BoundedStorable for Collaboration {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for Track {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(&bytes).unwrap()
    }
}

impl BoundedStorable for Track {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}