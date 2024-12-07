# Specify the provider
provider "google" {
  credentials = file(var.credentials_file)
  project     = var.project_id
  region      = var.region
}

# Reserve a Static IP
resource "google_compute_address" "static_ip" {
  name   = "my-static-ip"
  region = var.region
}

# Create a Virtual Private Cloud (VPC)
resource "google_compute_network" "vpc_network" {
  name                    = "my-vpc-network"
  auto_create_subnetworks = false
}

# Create a Subnet for the VPC
resource "google_compute_subnetwork" "subnet" {
  name          = "my-subnet"
  network       = google_compute_network.vpc_network.self_link
  region        = var.region
  ip_cidr_range = "10.0.1.0/24"
}

# Firewall Rule for SSH Traffic
resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["ssh-server"]
}

# Firewall Rule for HTTP Traffic
resource "google_compute_firewall" "allow_http" {
  name    = "allow-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

# Firewall Rule for HTTPS Traffic
resource "google_compute_firewall" "allow_https" {
  name    = "allow-https"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["https-server"]
}

# Create a VM Instance with Static IP and Metadata Startup Script
resource "google_compute_instance" "vm_instance" {
  name         = "my-vm-instance"
  machine_type = "e2-medium"
  zone         = "us-central1-a"
  tags         = ["ssh-server", "http-server", "https-server"]

  # Attach the reserved static IP
  network_interface {
    network    = google_compute_network.vpc_network.name
    subnetwork = google_compute_subnetwork.subnet.name

    access_config {
      nat_ip = google_compute_address.static_ip.address
    }
  }

  # Boot disk configuration
  boot_disk {
    initialize_params {
      image = "projects/debian-cloud/global/images/family/debian-11"
    }
  }

  # Metadata startup script to serve a landing page
  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt-get update
    apt-get install -y apache2
    systemctl start apache2
    systemctl enable apache2
    echo "<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Task 5: Infrastructure as Code (IaC)</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    header {
      background-color: #333;
      color: #fff;
      padding: 10px 0;
      text-align: center;
    }
    header h1 {
      margin: 0;
    }
    section {
      padding: 20px;
      text-align: center;
    }
    section h2 {
      color: #333;
    }
    section p {
      color: #666;
      line-height: 1.5;
    }
    footer {
      background-color: #333;
      color: #fff;
      padding: 10px 0;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <h1>Task 5: Infrastructure as Code (IaC)</h1>
  </header>

  <!-- Main Content Section -->
  <section>
    <h2>Objective</h2>
    <p>
      This task involves using a tool of your choice to define and deploy cloud resources. The resources
      to be created include:
    </p>
    <ul>
      <li>Virtual machine instance</li>
      <li>Networking components (e.g., VPC, subnets)</li>
      <li>Appropriate security configurations</li>
    </ul>
    <p>
      The goal is to automate infrastructure provisioning using Infrastructure as Code (IaC) tools,
      with a focus on DevOps and Cloud Engineering practices.
    </p>

    <h2>Evaluation Criteria</h2>
    <p>The following criteria will be used to evaluate the task:</p>
    <ul>
      <li>Correct IaC script</li>
      <li>Successful resource deployment</li>
      <li>Proper handling of dependencies and relationships</li>
    </ul>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; 2024 Infrastructure as Code - DevOps and Cloud Engineering</p>
  </footer>

</body>
</html>
" > /var/www/html/index.html
  EOT
}
