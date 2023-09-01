var productPrices = {
    Select: 0,
    Perfiles: 5,
    Lamina: 8,
    Helado: 10
};
function generatePDF() {
    var productElements = document.querySelectorAll('.add-product');
    var productsData = [];
    var total = 0; // Initialize total to zero
    var totalITBMS = 0; // Initialize total ITBMS to zero
    var subtotal = 0; // Initialize subtotal to zero

    
    productElements.forEach(function(productElement) {
        var quantity = productElement.querySelector('input[name="numberInput"]').value;
        var selectedOption = productElement.querySelector('select[name="selectOption"]').value;
        var price = productPrices[selectedOption]; // Get price from the database

        var totalPrice = price * quantity;
        var itbms = totalPrice * 0.07; // Calculate ITBMS for this product
        totalITBMS += itbms; // Update the total ITBMS
        total += totalPrice; // Update the total
        subtotal += totalPrice; // Update the subtotal

        productsData.push({
            quantity: quantity,
            selectedOption: selectedOption,
            price: price,
            totalPrice: totalPrice, // Store the total price for each product
            itbms: itbms // Store the ITBMS for each product
        });
    });


    props.invoice.table = productsData.map(function(product, index) {
        return [
            index + 1,
            product.selectedOption,
            "B/." + product.price.toFixed(2),
            product.quantity,
            "B/." + product.itbms.toFixed(2), // ITBMS
            "B/." + (product.totalPrice + product.itbms).toFixed(2) // Total price for this product
        ];
    });

    props.invoice.table = productsData.map(function(product, index) {
        return [
            index + 1,
            product.selectedOption,
            "B/." + product.price.toFixed(2),
            product.quantity,
            "B/." + product.itbms.toFixed(2), // ITBMS
            "B/." + (product.totalPrice + product.itbms).toFixed(2) // Total price for this product
        ];
    });

    // Update the additionalRows array to include subtotal, total ITBMS, and total
    props.invoice.additionalRows.push(
        {
            col1: 'Subtotal:',
            col2: 'B/.' + subtotal.toFixed(2),
           
            style: {
                fontSize: 10
            }
        },
        {
            col1: 'Total ITBMS:',
            col2: 'B/.' + totalITBMS.toFixed(2),
          
            style: {
                fontSize: 10
            }
        },
        {
            col1: 'Total:',
            col2: 'B/.' + (totalITBMS + subtotal).toFixed(2),
         
            style: {
                fontSize: 14
            }
        }
    );

    var pdfObject = jsPDFInvoiceTemplate.default(props);
}
var props = {
    outputType: jsPDFInvoiceTemplate.OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "/img/logo.jpeg",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Centro de Materiales y Decorativos L.P",
        address: "Via Transistmica, 100 mts despues de la entrade de Villa",
        phone: "320-1587 / 268-3955",
        email: "decorativoslp@outlook.com",
        website: "www.materialeslp.com",
    },
    contact: {
        label: "# customer id",
        name: "Nombre del cliente",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Cotizacion #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        table: [], // Add an empty array for the table data
        header: [
            {
                title: "#", 
                style: { 
                    width: 10 
                } 
            }, 
            { 
                title: "Description",
                style: {
                    width: 80
                } 
            }, 
            { title: "Price"},
            { title: "Quantity"},
            { title: "ITBMS"},
            { title: "Total"}
        ],
        
        additionalRows: [
            // {
            //     col1: 'Total:',
            //     col2: '145,250.50',
            //     col3: 'ALL',
            //     style: {
            //         fontSize: 14 //optional, default 12
            //     }
            // },
            // {
            //     col1: 'SubTotal:',
            //     col2: '116,199.90',
            //     col3: 'ALL',
            //     style: {
            //         fontSize: 10 //optional, default 12
            //     }
            // },
            // {
            //     col1: 'ITBMS:',
            //     col2: '4000$',
            //     col3: '0.7%',
            //     style: {
            //         fontSize: 10 //optional, default 12
            //     }
            // }
           
        ],
        invDescLabel: "Invoice Note",
        invDesc: "Esta cotización tiene validez de 2 días. TODO pedido demoran un mínimo de 2 días hábiles. Todo al Contado. Pedidos no tienen devolución. Formas de pago: Efectivo / ACH o deposito a nombre de Centro de Materiales y Decorativos L.P., S.A. Global Bank - Corriente - 26-101-23113-4 // Banco General - Ahorro - 04-01-98-791465-8",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};

function addProduct() {
    var productsContainer = document.getElementById('products-container');
    var productTemplate = document.querySelector('.add-product');
    var newProduct = productTemplate.cloneNode(true);

    newProduct.querySelector('input[name="numberInput"]').value = "";
    newProduct.querySelector('select[name="selectOption"]').selectedIndex = 0;

    productsContainer.appendChild(newProduct);
}
function deleteProduct(button) {
    var productElement = button.parentNode; // Get the parent div
    productElement.remove(); // Remove the entire product div
}