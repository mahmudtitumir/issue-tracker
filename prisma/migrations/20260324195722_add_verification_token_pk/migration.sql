-- AlterTable
ALTER TABLE `VerificationToken` ADD PRIMARY KEY (`identifier`, `token`);

-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `VerificationToken`;
