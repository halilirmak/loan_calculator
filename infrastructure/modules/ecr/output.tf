output "docker_image_url" {
  value = "${aws_ecr_repository.this.repository_url}:latest"
}
