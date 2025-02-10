package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SupplyChainContract defines the smart contract
type SupplyChainContract struct {
	contractapi.Contract
}

// Product represents a supply chain item
type Product struct {
	Name        string `json:"name"`
	Manufacturer string `json:"manufacturer"`
	Owner       string `json:"owner"`
	Location    string `json:"location"`
	Timestamp   string `json:"timestamp"`
}

// CreateProduct adds a new product to the ledger
func (s *SupplyChainContract) CreateProduct(ctx contractapi.TransactionContextInterface, productId string, name string, manufacturer string) error {
	exists, err := s.ProductExists(ctx, productId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("Product %s already exists", productId)
	}

	product := Product{
		Name:        name,
		Manufacturer: manufacturer,
		Owner:       manufacturer,
		Location:    "Factory",
		Timestamp:   time.Now().Format(time.RFC3339),
	}

	productJSON, err := json.Marshal(product)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(productId, productJSON)
}

// UpdateLocation updates the product location and owner
func (s *SupplyChainContract) UpdateLocation(ctx contractapi.TransactionContextInterface, productId string, newLocation string, newOwner string) error {
	productJSON, err := ctx.GetStub().GetState(productId)
	if err != nil {
		return fmt.Errorf("failed to read from world state: %v", err)
	}
	if productJSON == nil {
		return fmt.Errorf("Product %s does not exist", productId)
	}

	var product Product
	err = json.Unmarshal(productJSON, &product)
	if err != nil {
		return err
	}

	product.Location = newLocation
	product.Owner = newOwner
	product.Timestamp = time.Now().Format(time.RFC3339)

	updatedProductJSON, err := json.Marshal(product)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(productId, updatedProductJSON)
}

// GetProduct retrieves product details
func (s *SupplyChainContract) GetProduct(ctx contractapi.TransactionContextInterface, productId string) (*Product, error) {
	productJSON, err := ctx.GetStub().GetState(productId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if productJSON == nil {
		return nil, fmt.Errorf("Product %s does not exist", productId)
	}

	var product Product
	err = json.Unmarshal(productJSON, &product)
	if err != nil {
		return nil, err
	}

	return &product, nil
}

// ProductExists checks if a product exists in the ledger
func (s *SupplyChainContract) ProductExists(ctx contractapi.TransactionContextInterface, productId string) (bool, error) {
	productJSON, err := ctx.GetStub().GetState(productId)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}
	return productJSON != nil, nil
}

func main() {
	chaincode, err := contractapi.NewChaincode(new(SupplyChainContract))
	if err != nil {
		fmt.Printf("Error creating supply chain contract: %s", err)
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting supply chain contract: %s", err)
	}
}
