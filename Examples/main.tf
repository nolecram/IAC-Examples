# Configure the Azure provider
provider "azurerm" {
  features {}  # Enables all features for the Azure provider
}

# Create a resource group named "example" in the "West Europe" region
resource "azurerm_resource_group" "example" {
  name     = "example"
  location = "West Europe"
}

# Create a virtual network within the "example" resource group
resource "azurerm_virtual_network" "example_vnet" {
  name                = "example-vnet"  # Name of the virtual network
  address_space       = ["10.0.0.0/16"] # Address space for the virtual network
  location            = azurerm_resource_group.example.location  # Use the same location as the resource group
  resource_group_name = azurerm_resource_group.example.name      # Associate with the "example" resource group
}