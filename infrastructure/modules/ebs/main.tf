resource "aws_elastic_beanstalk_application" "this" {
  name        = var.app_name
  description = var.description
}

resource "aws_elastic_beanstalk_environment" "this" {
  name                = var.app_name
  application         = aws_elastic_beanstalk_application.this.name
  solution_stack_name = "64bit Amazon Linux 2 v5.8.4 running Docker"

  setting {
    namespace = "aws:elasticbeanstalk:container:docker"
    name      = "Image"
    value     = var.docker_image_url
  }

  dynamic "setting" {
    for_each = var.env_vars
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
    }
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", var.subnets)
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "SecurityGroups"
    value     = var.security_group_id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "true"
  }
}
