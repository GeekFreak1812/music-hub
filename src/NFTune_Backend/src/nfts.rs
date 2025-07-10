use ic_cdk::api::time;
use uuid::Uuid;
use crate::types::NFT;
use crate::storage::{get_nft_by_id, save_nft, get_all_nfts, get_project_by_id};
use crate::auth::require_authenticated;

pub fn create_nft(
    project_id: String,
    title: String,
    description: Option<String>,
    price: Option<u64>,
    royalty_percentage: u8,
    metadata_uri: String,
) -> Result<NFT, String> {
    let creator = require_authenticated()?;
    
    // Verify project exists and user has access
    let project = get_project_by_id(&project_id)
        .ok_or_else(|| "Project not found".to_string())?;

    if project.owner != creator && !project.collaborators.contains(&creator.to_string()) {
        return Err("Only project owner or collaborators can create NFTs".to_string());
    }

    if royalty_percentage > 50 {
        return Err("Royalty percentage cannot exceed 50%".to_string());
    }

    let nft = NFT {
        id: Uuid::new_v4().to_string(),
        project_id,
        creator,
        title,
        description,
        price,
        royalty_percentage,
        metadata_uri,
        token_id: None,
        contract_address: None,
        is_minted: false,
        is_listed: false,
        opensea_url: None,
        created_at: time(),
        updated_at: time(),
    };

    save_nft(nft.clone());
    Ok(nft)
}

pub fn get_nfts() -> Vec<NFT> {
    get_all_nfts()
}

pub fn get_nft(id: String) -> Result<NFT, String> {
    get_nft_by_id(&id)
        .ok_or_else(|| "NFT not found".to_string())
}

pub fn get_project_nfts(project_id: String) -> Vec<NFT> {
    get_all_nfts()
        .into_iter()
        .filter(|nft| nft.project_id == project_id)
        .collect()
}

pub fn mint_nft(id: String, token_id: String, contract_address: String) -> Result<NFT, String> {
    let caller = require_authenticated()?;
    
    let mut nft = get_nft_by_id(&id)
        .ok_or_else(|| "NFT not found".to_string())?;

    if nft.creator != caller {
        return Err("Only NFT creator can mint".to_string());
    }

    if nft.is_minted {
        return Err("NFT already minted".to_string());
    }

    nft.token_id = Some(token_id.clone());
    nft.contract_address = Some(contract_address.clone());
    nft.is_minted = true;
    nft.opensea_url = Some(format!("https://opensea.io/assets/ethereum/{}/{}", contract_address, token_id));
    nft.updated_at = time();

    save_nft(nft.clone());
    Ok(nft)
}