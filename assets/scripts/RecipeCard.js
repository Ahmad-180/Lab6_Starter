// RecipeCard.js

class RecipeCard extends HTMLElement {

	constructor() {
		super();                                    // inherit from HTMLElement

		this.attachShadow({ mode: 'open' });
	
		this._article = document.createElement('article');
	
		const style = document.createElement('style');
	
		
		style.textContent = `
		  * {
			font-family: sans-serif;
			margin: 0; padding: 0;
		  }
		  article {
			border: 1px solid #dcdcdc;
			border-radius: 12px;
			overflow: hidden;
			width: 178px;
			box-shadow: 0 1px 3px rgba(0,0,0,.2);
		  }
		  article > img {                          
       		 width: 100%;
       		 height: 118px;
        	 object-fit: cover;
     	 }
      	.rating > img {                         
        	width: 78px;
        	height: auto;
      	 }
		  p.title {
			font-size: 16px;
			margin: 8px 12px;
			height: 48px;
			overflow: hidden;
		  }
		  p.title a {
			text-decoration: none;
			color: #000;
		  }
		  p.organization {
			font-size: 12px;
			color: #757575;
			margin: 0 12px 8px;
		  }
		  div.rating {
			display: flex;
			align-items: center;
			gap: 4px;
			margin: 0 12px 8px;
			font-size: 12px;
		  }
		  time {
			display: block;
			margin: 0 12px 8px;
			font-size: 12px;
			color: #757575;
		  }
		  p.ingredients {
			margin: 0 12px 12px;
			font-size: 12px;
			height: 32px;
			overflow: hidden;
			color: #757575;
		  }
		`;
	
		/* ---------- A5: add <style> and <article> to Shadow DOM ---------- */
		this.shadowRoot.append(style, this._article);
	  }
	
	  /**
	   * called whenever card.data = {...} is set
	   * @param {Object} data see expected structure above
	   */
	  set data(data) {
		/* guard-rail */
		if (!data) return;
	
		const {
		  imgSrc, imgAlt,
		  titleLnk, titleTxt,
		  organization,
		  rating, numRatings,
		  lengthTime,
		  ingredients
		} = data;
	
		/* Build innerHTML with template literals (only one <article>) */
		this._article.innerHTML = `
		  <img src="${imgSrc}" alt="${imgAlt}">
		  <p class="title"><a href="${titleLnk}">${titleTxt}</a></p>
		  <p class="organization">${organization}</p>
		  <div class="rating">
			<span>${rating}</span>
			<img src="assets/images/icons/${Math.round(rating)}-star.svg" alt="${rating} stars">
			<span>(${numRatings})</span>
		  </div>
		  <time>${lengthTime}</time>
		  <p class="ingredients">
			${Array.isArray(ingredients) ? ingredients.join(', ') : ingredients}
		  </p>
		`;
	  }
	}
	
	customElements.define('recipe-card', RecipeCard);