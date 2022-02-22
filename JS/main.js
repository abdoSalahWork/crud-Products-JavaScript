(async function () {

    let productName = document.getElementById("ProductName");
    let productCategory = document.getElementById("ProductCategory");
    let productPrice = document.getElementById("ProductPrice");
    let productDescription = document.getElementById("ProductDescription");

    // let pagNum = 1;
    // let previous = 'disabled';
    // let next = 'enbled';
    // let list = ``;

    let setUpdate = document.getElementById('setUpdate')
    let setDelete = document.getElementById('setDelete')

    let success = document.getElementById("success");
    let erorrProductName = document.getElementById("erorrProductName");
    let erorrProductCategory = document.getElementById("erorrProductCategory");
    let erorrProductPrice = document.getElementById("erorrProductPrice");
    let erorrProductDescription = document.getElementById("erorrProductDescription");

    allData = await (await fetch(`http://127.0.0.1:8000/api/products`)).json();

    display();

    function display() {

        var copaya = ``;
        for (let i = 0; i < allData.data.length; i++) {
            copaya +=
                `<tr>
                <td>${[i + 1]}</td>
                <td>${allData.data[i].productName}</td>
                <td>${allData.data[i].productCategory}</td>
                <td>${allData.data[i].productPrice}</td>
                <td>${allData.data[i].productDescription}</td>
    
                <!-- Button trigger modal -->
                <td>
                    <button type="button" onclick="getUpdate(${allData.data[i].id})" class="btn btn-info" data-toggle="modal" data-target="#exampleModalLong">Update</button> 
                </td>
                
                <td>
                    <button class="btn btn-danger" onclick="getDelete(${allData.data[i].id})" data-toggle="modal" data-target="#exampleModal">Delete</button>
                </td>
            </tr>`

        }

        document.getElementById("demo").innerHTML = copaya
    }

    function showMassege(message) {

        if (message.success != undefined) {
            success.style.cssText = "display:block !important"
            success.innerHTML = message.success

            display()
            clear()
        }


        else {
            if (message.errors.productName) {
                erorrProductName.style.cssText = "display:block !important"
                erorrProductName.innerHTML = message.errors.productName
            }
            if (message.errors.productCategory) {
                erorrProductCategory.style.cssText = "display:block !important"
                erorrProductCategory.innerHTML = message.errors.productCategory
            }
            if (message.errors.productPrice) {
                erorrProductPrice.style.cssText = "display:block !important"
                erorrProductPrice.innerHTML = message.errors.productPrice
            }
            if (message.errors.productDescription) {
                erorrProductDescription.style.cssText = "display:block !important"
                erorrProductDescription.innerHTML = message.errors.productDescription
            }
        }
    }

    function showMassegeUpdate(message) {

        if (message.success != undefined) {

            $("#exampleModalLong").modal('hide')
            display()
        }


        else {
            if (message.errors.productName) {
                updateErorrProductName.style.cssText = "display:block !important"
                updateErorrProductName.innerHTML = message.errors.productName
            }

            if (message.errors.productCategory) {

                updateErorrProductCategory.style.cssText = "display:block !important"
                updateErorrProductCategory.innerHTML = message.errors.productCategory
            }
            if (message.errors.productPrice) {
                updateErorrProductPrice.style.cssText = "display:block !important"
                updateErorrProductPrice.innerHTML = message.errors.productPrice
            }
            if (message.errors.productDescription) {
                updateErorrProductDescription.style.cssText = "display:block !important"
                updateErorrProductDescription.innerHTML = message.errors.productDescription
            }

        }
    }

    setData.addEventListener('click', async function () {
        success.style.cssText = "display:none !important"
        erorrProductName.style.cssText = "display: none !important"
        erorrProductCategory.style.cssText = "display: none !important"
        erorrProductPrice.style.cssText = "display: none important"
        erorrProductDescription.style.cssText = "display: none !important"

        let product = {
            productName: productName.value,
            productCategory: productCategory.value,
            productPrice: productPrice.value,
            productDescription: productDescription.value
        };

        let message = await fetch('http://127.0.0.1:8000/api/product/store', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(res => res.json())
        console.log(message);
        allData = await (await fetch(`http://127.0.0.1:8000/api/products`)).json();

        showMassege(message);

    });

    setUpdate.addEventListener('click', async function () {

        let product = {
            productName: updateProductName.value,
            productCategory: updateProductCategory.value,
            productPrice: updateProductPrice.value,
            productDescription: updateProductDescription.value
        };

        let message = await fetch(`http://127.0.0.1:8000/api/product/update/${upadateDataId.value}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(res => res.json())


        allData = await (await fetch(`http://127.0.0.1:8000/api/products`)).json();
        showMassegeUpdate(message);

    })

    setDelete.addEventListener('click' , async function(){
       let m = await fetch(`http://127.0.0.1:8000/api/product/delete/${deleteDataId.value}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        $("#exampleModal").modal('hide')
        allData = await (await fetch(`http://127.0.0.1:8000/api/products`)).json();
        display();

    })
    
    search.addEventListener('keyup', async function () {
        allData = await (await fetch(`http://127.0.0.1:8000/api/products/search?search=${search.value}`)).json();
        display()
    })

    function clear() {
        productName.value = ""
        productCategory.value = ""
        productPrice.value = ""
        productDescription.value = ""
    }
    
})();

async function getUpdate(index) {

    updateErorrProductName.style.cssText = "display: none !important"
    updateErorrProductCategory.style.cssText = "display: none !important"
    updateErorrProductPrice.style.cssText = "display: none !important"
    updateErorrProductDescription.style.cssText = "display: none !important"

    let getData = await (await fetch(`http://127.0.0.1:8000/api/product/show/${index}`)).json();

    document.getElementById('upadateDataId').value = getData.data.id
    document.getElementById("updateProductName").value = getData.data.productName
    document.getElementById("updateProductCategory").value = getData.data.productCategory
    document.getElementById("updateProductPrice").value = getData.data.productPrice
    document.getElementById("updateProductDescription").value = getData.data.productDescription

}

function getDelete(index) {
    
    document.getElementById('deleteDataId').value = index
}


