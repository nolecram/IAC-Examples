provider "azurerm" {
    features {}
}

# Define a resource group in Azure
resource "azurerm_resource_group" "example" {
    name     = "example-resources"  # Name of the resource group
    location = "West Europe"        # Location of the resource group
}

# Define a virtual network within the resource group
resource "azurerm_virtual_network" "example" {
    name                = "example-vnet"  # Name of the virtual network
    address_space       = ["10.0.0.0/16"] # Address space for the virtual network
    location            = azurerm_resource_group.example.location  # Location of the virtual network, same as the resource group
    resource_group_name = azurerm_resource_group.example.name      # Resource group name, same as the resource group
}
