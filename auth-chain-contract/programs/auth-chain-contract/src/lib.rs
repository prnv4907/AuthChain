use anchor_lang::prelude::*;

declare_id!("5byAU7KogV4Y8AAXA9TiuBwZbq39fYQG2evQmPgJQANQ");

#[program]
pub mod auth_chain_contract {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>, product_id: u64) -> Result<()> {
        let mut pdaAccount = &mut ctx.accounts.pdaAccount;
        let clock = Clock::get()?;
        pdaAccount.owner = ctx.accounts.signer.key();
        pdaAccount.product_id = product_id;
        pdaAccount.last_updated_time = clock.unix_timestamp;
        pdaAccount.bump = ctx.bumps.pdaAccount;
        msg!(
            "pda account has been created on address{}",
            pdaAccount.key()
        );
        Ok(())
    }
    pub fn transfer(
        ctx: Context<TransferAccount>,
        product_id: u64,
        new_owner: Pubkey,
    ) -> Result<()> {
        let clock = Clock::get()?;
        let mut pdaAccount = &mut ctx.accounts.pdaAccount;
        let owner = pdaAccount.owner;
        pdaAccount.owner = new_owner.key();
        pdaAccount.last_updated_time = clock.unix_timestamp;
        emit!(TransferEvent {
            from: owner,
            to: pdaAccount.owner
        });
        msg!(
            "{} is transferred to {}",
            pdaAccount.owner.key(),
            new_owner.key()
        );
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(product_id:u64)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(init,
    payer=signer,
    space=8+32+8+8+1,
    seeds=[b"product1",product_id.to_le_bytes().as_ref()], 
    bump)]
    pub pdaAccount: Account<'info, ProductAccount>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(product_id:u64)]
pub struct TransferAccount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut,
    seeds=[b"product1",product_id.to_le_bytes().as_ref()],
    bump=pdaAccount.bump,
    constraint=pdaAccount.owner==signer.key()@AuthChainError::InvalidOwner)]
    pub pdaAccount: Account<'info, ProductAccount>,
    pub system_program: Program<'info, System>,
}
#[account]
pub struct ProductAccount {
    pub owner: Pubkey,
    pub product_id: u64,
    pub last_updated_time: i64,
    pub bump: u8,
}
#[error_code]
pub enum AuthChainError {
    #[msg("Anauthorized Access")]
    InvalidOwner,
}
#[event]
pub struct TransferEvent {
    from: Pubkey,
    to: Pubkey,
}
