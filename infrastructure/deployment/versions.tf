locals {
  roles = {
    staging    = "arn:aws:iam::000880799170:role/OrganizationAccountAccessRole",
    dev        = "arn:aws:iam::680334766302:role/OrganizationAccountAccessRole",
    production = "arn:aws:iam::203862167485:role/OrganizationAccountAccessRole",
  }
}
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "seedata-seed-deployment-management-tf-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region = "eu-west-1"
  assume_role {
    role_arn = local.roles[terraform.workspace]
  }
}

