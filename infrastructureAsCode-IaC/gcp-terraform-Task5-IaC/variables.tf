# Define the project_id variable
variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

# Define the region variable
variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "us-central1"
}

# Define the credentials file variable
variable "credentials_file" {
  description = "Path to the Google Cloud credentials JSON file"
  type        = string
}
