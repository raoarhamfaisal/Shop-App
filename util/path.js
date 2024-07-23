const path = require("path");

module.exports = path.dirname(process.mainModule.filename);

// <% if(isAuthenticated){ %>
//     <li class="main-header__item">
//       <a
//         class="<%= path === '/admin/add-product' ? 'active' : '' %>"
//         href="/admin/add-product"
//         >Add Product
//       </a>
//     </li>
//     <li class="main-header__item">
//       <a
//         class="<%= path === '/admin/products' ? 'active' : '' %>"
//         href="/admin/products"
//         >Admin Products
//       </a>
//     </li>
//     <% } %>
