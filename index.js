// Sample Data
const Items = [
    {   
        id: "item1",
        itemName: "Butter Roti",
        rate: 20,
        taxes: [
            {
                name: "Service Charge",
                rate: 10,
                isInPercent: 'Y'
            }
        ],
        category: {
            categoryId: "C2"
        }
    },
    {
        id: "item2",
        itemName: "Paneer Butter Masala",
        rate: 150,
        taxes: [
            {
                name: "Service Charge",
                rate: 5,
                isInPercent: 'Y'
            }
        ],
        category: {
            categoryId: "C1"
        }
    }
];

const Categories = [
    {
        id: "C1",
        categoryName: "Platters",
        superCategory: {
            superCategoryName: "South Indian",
            id: "SC1"
        }
    },
    {
        id: "C2",
        categoryName: "Breads",
        superCategory: {
            superCategoryName: "Indian",
            id: "SC2"
        }
    }
];

const bill = {
    id: "B1",
    billNumber: 1,
    opentime: "06 Nov 2020 14:19",
    customerName: "CodeQuotient",
    billItems: [
        {
            id: "item2",
            quantity: 3,
            discount: {
                rate: 10,
                isInPercent: 'Y'
            }
        }
    ]
};

// Task 1: Create a Bill Structure with Item Names
function createBillStructure(bill, items) {
    return {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: bill.billItems.map(billItem => {
            const itemDetails = items.find(item => item.id === billItem.id);
            return {
                id: billItem.id,
                name: itemDetails ? itemDetails.itemName : 'Unknown Item',
                quantity: billItem.quantity
            };
        })
    };
}

// Task 2: Create a Bill Structure with Total Amount Calculation
function calculateTotalAmount(bill, items, categories) {
    let totalAmount = 0;

    const billStructure = {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: bill.billItems.map(billItem => {
            const itemDetails = items.find(item => item.id === billItem.id);
            const categoryDetails = categories.find(category => category.id === itemDetails.category.categoryId);
            
            // Calculate item amount before taxes/discounts
            let itemAmount = itemDetails.rate * billItem.quantity;
            
            // Apply discount
            if (billItem.discount) {
                const discount = billItem.discount.isInPercent === 'Y'
                    ? (billItem.discount.rate / 100) * itemAmount
                    : billItem.discount.rate;
                itemAmount -= discount;
            }

            // Apply taxes
            itemDetails.taxes.forEach(tax => {
                const taxAmount = tax.isInPercent === 'Y'
                    ? (tax.rate / 100) * itemAmount
                    : tax.rate;
                itemAmount += taxAmount;
            });

            // Add item amount to total amount
            totalAmount += itemAmount;

            return {
                id: billItem.id,
                name: itemDetails.itemName,
                quantity: billItem.quantity,
                discount: billItem.discount,
                taxes: itemDetails.taxes,
                amount: itemAmount,
                superCategoryName: categoryDetails.superCategory.superCategoryName,
                categoryName: categoryDetails.categoryName
            };
        }),
        "Total Amount": totalAmount
    };

    return billStructure;
}

// Example usage
console.log(createBillStructure(bill, Items)); // Task 1
console.log(calculateTotalAmount(bill, Items, Categories)); // Task 2
