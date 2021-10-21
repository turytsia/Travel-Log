import React from "react";
import { Link } from "react-router-dom";
//comps
import Aside from "./components/Aside";
//images
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import ava from "./images/avatar_man.png";
export default function Blog() {
  return (
    <section className="blog">
      <div className="main-wrapper">
        <div className="blog-content">
          <div className="blog-head">
            <h1 className="blog-title">Title of this Blog</h1>
            <div className="blog-type">Cheap</div>
          </div>
          <p className="blog-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            inventore harum commodi dolor ex fuga nemo voluptas beatae nam
            delectus, aperiam repellendus odio totam quisquam a ad perspiciatis
            quo nesciunt laudantium illum dolorum? Numquam incidunt, aliquid hic
            ducimus, facilis veritatis id repellendus fugiat, et eaque ipsa
            voluptate? Cupiditate, ut velit?
          </p>
          <p className="blog-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
            reprehenderit dolorum, possimus repellat perspiciatis libero minima
            magnam consequatur in quas voluptatibus nesciunt alias deleniti enim
            suscipit, voluptate nihil dolore, distinctio quae ratione provident
            eligendi! Commodi earum, inventore neque blanditiis ut quis debitis
            provident! Possimus magnam praesentium, neque iusto veniam expedita
            architecto labore quasi beatae. Quia nam inventore delectus ad
            facilis nemo alias omnis placeat cum impedit quaerat maiores labore
            incidunt harum perferendis deserunt ex, aliquid odit iusto minima
            praesentium est consequuntur animi! Voluptatibus ex reiciendis
            doloribus enim quasi voluptatum nemo.
          </p>
          <h2 className="blog-subtitle">Images from travel</h2>
          <div className="blog-gallery">
            <div
              className="blog-img"
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
            <div
              className="blog-img"
              style={{ backgroundImage: `url(${img2})` }}
            ></div>
            <div
              className="blog-img"
              style={{ backgroundImage: `url(${img3})` }}
            ></div>
          </div>
          <p className="blog-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            impedit perferendis tempore expedita nam fugit, odio in hic
            reiciendis ullam dolores. Minus fuga sequi odit ipsum, tenetur,
            harum deserunt dolorum vero omnis porro aliquam tempora!
          </p>
          <div className="blog-cred">
            <h2 className="blog-price">
              Money spent: <span>350$</span>
            </h2>
            <h2 className="blog-author">
              Written by
              <Link to="/">Alexander</Link>
            </h2>
          </div>
          <div className="blog-tags">
              <button className="blog-tags-item">
                  Tag1
              </button>
              <button className="blog-tags-item">
                  Tag1
              </button>
              <button className="blog-tags-item">
                  Tag1
              </button>
              <button className="blog-tags-item">
                  Tag1
              </button>
          </div>
          <div className="blog-info">
            <div className="blog-options">
              <i class="fas fa-bookmark"></i>
              Save
              <i class="fas fa-flag"></i>
              Report
              <i class="fas fa-edit"></i>
              Edit
            </div>
            <div className="blog-rating">
              <i class="fas fa-thumbs-up"></i>
              78
              <i class="fas fa-thumbs-down"></i>
              29
            </div>
          </div>



          <div className="blog-review">
              <h2 className="blog-review-title">
                  What do you think of this Blog?
              </h2>
              <textarea className = "blog-review-textarea" placeholder = "This blog was ..."></textarea>
              <button className="blog-review-btn">
                  Send
              </button>
          </div>

          {/*Comments component*/}
          <div className="comments">
            <h2 className="comments-title">Comments:</h2>
            <div className="comments-item">
              <div>
                <div
                  className="comments-ava"
                  style={{ backgroundImage: `url(${ava})` }}
                ></div>
                <div className="comments-name">
                  <Link to={""}>Alexander Turytsia</Link>
                </div>
              </div>
              <div>
                <p className="comments-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, voluptatum iusto numquam impedit animi iste
                  voluptates.
                </p>
                <span class="comments-btn">Reply</span>
              </div>
              <div className="comments-like">
                <i class="fas fa-heart"></i>
                23
              </div>
            </div>
          </div>
        </div>
        <Aside />
      </div>
    </section>
  );
}
