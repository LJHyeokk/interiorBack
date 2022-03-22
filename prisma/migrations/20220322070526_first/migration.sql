-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_admin` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `board` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `description` VARCHAR(400) NULL,
    `miniDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_main` BOOLEAN NULL DEFAULT false,
    `url` VARCHAR(191) NULL,
    `s3key` VARCHAR(191) NULL,
    `board_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
