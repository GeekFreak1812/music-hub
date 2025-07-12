use candid::Principal;
use ic_cdk::{caller, api::time};
use crate::types::User;
use crate::storage::{get_user_by_principal, save_user};

pub fn register_user(name: Option<String>, email: String) -> Result<User, String> {
    let principal = caller();
    
    if principal == Principal::anonymous() {
        return Err("Anonymous users cannot register".to_string());
    }

    // Check if user already exists
    if let Some(_) = get_user_by_principal(principal) {
        return Err("User already registered".to_string());
    }

    let user = User {
        principal,
        name,
        email,
        avatar_url: None,
        created_at: time(),
    };

    save_user(user.clone());
    Ok(user)
}

pub fn get_user() -> Result<User, String> {
    let principal = caller();
    
    if principal == Principal::anonymous() {
        return Err("Anonymous users cannot access user data".to_string());
    }

    get_user_by_principal(principal)
        .ok_or_else(|| "User not found".to_string())
}

pub fn require_authenticated() -> Result<Principal, String> {
    let principal = caller();
    
    if principal == Principal::anonymous() {
        return Err("Authentication required".to_string());
    }

    // Check if user exists
    get_user_by_principal(principal)
        .ok_or_else(|| "User not registered".to_string())?;

    Ok(principal)
}