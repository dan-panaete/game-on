export function mapProductToCard(product) {
    return `
         <div class="card flex-col items-center justify-around gap-20">
        <div class="info flex-col items-center gap-20">
        <div class="img">
          <img class="product-image" src=${product.imageURL} alt="">
        </div>
        <div class="name">
          <a href="pages/details.html?id=${product.id}" class="product-name-link">
            <h4 class="product-name">${product.name}</h4>
          </a>
        </div>
        <div class="price product-price">${product.price} lei</div>
      </div>
      <button class="add-to-cart" 
        data-productId=${product.id}
        data-name="${product.name}"
        data-price=${product.price}
        data-image=${product.imageURL}>
        Adaugă în coș
      </button>
    </div>


      `;
  }
  
  export function mapProductToAdminTableRow(product) {
    return `
          <tr>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><img width="50px" src=${product.imageURL} /></td>
              <td>${product.details} </td>
              <td>
                  <button class="edit-btn" data-productId=${product.id}>Edit</button>
              </td>
              <td>
                  <button class="delete-btn" data-productId=${product.id}>Delete</button>
              </td>
          </tr>
      `;
  }