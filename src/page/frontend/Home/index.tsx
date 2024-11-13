import React from 'react';
import { useForm } from "react-hook-form"
import LazyLoadImg from "@components/hook/LazyLoadImage";
import Input from '@components/frontend/InputFrom/Input';

import './home.scss'

const Home = () => {
  const boxText = [{
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur aperiam, culpa error aut facilis ea voluptatibus accusamus, alias dolor sunt quod eveniet autem nihil dignissimos! Recusandae neque quam repudiandae. Assumenda, nemo eos vel laudantium provident ex iure ratione consequuntur reiciendis commodi deserunt saepe atque officia odit natus temporibus perferendis consectetur! Voluptatum eaque ratione odit, beatae quia reiciendis commodi facilis. Quaerat maiores eaque distinctio.Odit, repudiandae.Magni, neque asperiores accusamus iusto amet, fugit ipsam omnis nesciunt velit necessitatibus obcaecati ea dolorum dolores nisi.Atque a illum aspernatur excepturi aperiam ullam? Nam quasi commodi odio, blanditiis inventore rem pariatur ratione neque saepe? Nulla voluptas temporibus animi similique deleniti quibusdam saepe dolor adipisci? Dolorem pariatur rem dolore corrupti officia nulla ullam esse! Ducimus et nisi maiores? Impedit excepturi unde ipsum possimus! '
  }, {
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur aperiam, culpa error aut facilis ea voluptatibus accusamus, alias dolor sunt quod eveniet autem nihil dignissimos! Recusandae neque quam repudiandae. Assumenda, nemo eos vel laudantium provident ex iure ratione consequuntur reiciendis commodi deserunt saepe atque officia odit natus temporibus perferendis consectetur! Voluptatum eaque ratione odit, beatae quia reiciendis commodi facilis. Quaerat maiores eaque distinctio.Odit, repudiandae.Magni, neque asperiores accusamus iusto amet, fugit ipsam omnis nesciunt velit necessitatibus obcaecati ea dolorum dolores nisi.Atque a illum aspernatur excepturi aperiam ullam? Nam quasi commodi odio, blanditiis inventore rem pariatur ratione neque saepe? Nulla voluptas temporibus animi similique deleniti quibusdam saepe dolor adipisci? Dolorem pariatur rem dolore corrupti officia nulla ullam esse! Ducimus et nisi maiores? Impedit excepturi unde ipsum possimus! '
  }, {
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur aperiam, culpa error aut facilis ea voluptatibus accusamus, alias dolor sunt quod eveniet autem nihil dignissimos! Recusandae neque quam repudiandae. Assumenda, nemo eos vel laudantium provident ex iure ratione consequuntur reiciendis commodi deserunt saepe atque officia odit natus temporibus perferendis consectetur! Voluptatum eaque ratione odit, beatae quia reiciendis commodi facilis. Quaerat maiores eaque distinctio.Odit, repudiandae.Magni, neque asperiores accusamus iusto amet, fugit ipsam omnis nesciunt velit necessitatibus obcaecati ea dolorum dolores nisi.Atque a illum aspernatur excepturi aperiam ullam? Nam quasi commodi odio, blanditiis inventore rem pariatur ratione neque saepe? Nulla voluptas temporibus animi similique deleniti quibusdam saepe dolor adipisci? Dolorem pariatur rem dolore corrupti officia nulla ullam esse! Ducimus et nisi maiores? Impedit excepturi unde ipsum possimus! '
  }]
  const boxImageText = [{
    title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur aperiam, culpa error aut facilis ea voluptatibus accusamus, alias dolor sunt quod eveniet autem nihil dignissimos! Recusandae neque quam repudiandae. Assumenda, nemo eos vel laudantium provident ex iure ratione consequuntur reiciendis commodi deserunt saepe atque officia odit natus temporibus perferendis consectetur! Voluptatum eaque ratione odit, beatae quia reiciendis commodi facilis. Quaerat maiores eaque distinctio.Odit, repudiandae.Magni, neque asperiores accusamus iusto amet, fugit ipsam omnis nesciunt velit necessitatibus obcaecati ea dolorum dolores nisi.Atque a illum aspernatur excepturi aperiam ullam? Nam quasi commodi odio, blanditiis inventore rem pariatur ratione neque saepe? Nulla voluptas temporibus animi similique deleniti quibusdam saepe dolor adipisci? Dolorem pariatur rem dolore corrupti officia nulla ullam esse! Ducimus et nisi maiores? Impedit excepturi unde ipsum possimus! ',
    imgaegUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title2: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    text2: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aspernatur aperiam, culpa error aut facilis ea voluptatibus accusamus, alias dolor sunt quod eveniet autem nihil dignissimos! Recusandae neque quam repudiandae. Assumenda, nemo eos vel laudantium provident ex iure ratione consequuntur reiciendis commodi deserunt saepe atque officia odit natus temporibus perferendis consectetur! Voluptatum eaque ratione odit, beatae quia reiciendis commodi facilis. Quaerat maiores eaque distinctio.Odit, repudiandae.Magni, neque asperiores accusamus iusto amet, fugit ipsam omnis nesciunt velit necessitatibus obcaecati ea dolorum dolores nisi.Atque a illum aspernatur excepturi aperiam ullam? Nam quasi commodi odio, blanditiis inventore rem pariatur ratione neque saepe? Nulla voluptas temporibus animi similique deleniti quibusdam saepe dolor adipisci? Dolorem pariatur rem dolore corrupti officia nulla ullam esse! Ducimus et nisi maiores? Impedit excepturi unde ipsum possimus! ',
    imgaegUrl2: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }]
  const {
    register,
    formState: { errors },
  } = useForm()

  return (
    <div className='home_page'>
      <section className="home-section">
        <div className="home-group">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="home-box">
                  <div className="box col-md-6 col-sm-12">
                    <h2>
                      <div className="box-title">
                        Lorem ipsum.
                      </div>
                    </h2>
                    <div className="box-content">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et. Suscipit asperiores dignissimos impedit, eius ipsa dolor voluptatem nobis tempora reiciendis error, cumque est omnis praesentium eum facere in libero vitae, atque laboriosam inventore deserunt facilis ex autem? Explicabo, reprehenderit. Ratione, natus provident, cum a sapiente nostrum laborum molestias perferendis et facere consequuntur voluptatibus! Consequatur reprehenderit doloremque, nisi, ea vitae rerum culpa commodi quas tenetur libero enim sint ab voluptate? Voluptatibus nesciunt est doloribus nostrum. Voluptas cum nemo quod ratione sint, magnam harum nostrum laborum, asperiores placeat reprehenderit natus praesentium, facere repudiandae fuga commodi. Quia voluptates nemo impedit maiores sit. Quod possimus aut officiis corporis, nisi reiciendis dicta corrupti perspiciatis eos deserunt. Totam reprehenderit quam ullam illum eveniet fugiat tenetur voluptatibus laborum fuga, eius possimus obcaecati vitae magnam. Est, natus?
                    </div>
                    <div className="box-btn">
                      <button type="button" className="text-nowrap btn btn-primary py-2" role="link" aria-label="box-link"
                      >Lorem ipsum.
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="home-list">

                {boxText.map((text, index) => (
                  <div className="home-item" key={`home_text${index}`}>
                    <div className="box">
                      <div className="box-image">
                        <div className="img_box">
                          <LazyLoadImg className="" src="https://images.unsplash.com/photo-1505576729450-2efc7c926227?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={text.title} />
                        </div>
                      </div>
                      <h3>
                        <div className="box-title">
                          {text.title}
                        </div>
                      </h3>
                      <div className="box-content">{text.text}</div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section home-section-color">
        <div className="home-box bg-body-secondary">
          <div className="box col-md-6 col-sm-12">
            <h4>
              <div className="box-title">
                Lorem ipsum.
              </div>
            </h4>
            <div className="box-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et.
            </div>
            <div className="home-subContent">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam?
            </div>
          </div>
        </div>
      </section>
      <section className="home-section home-section-imgBox">
        {boxImageText.map((imageinfo) => (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="home-box home-imgBox">
                  <div className="box col-10">
                    <h4>
                      <div className="box-title">
                        {imageinfo.title2}
                      </div>
                    </h4>
                    <div className="box-content">{imageinfo.text2}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="img_box"><LazyLoadImg className="" src={imageinfo.imgaegUrl2} alt={imageinfo.title2} /></div>
              </div >
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="img_box"><LazyLoadImg className="" src={imageinfo.imgaegUrl} alt={imageinfo.title} /></div>
              </div >
              <div className="col-md-6 col-sm-12">
                <div className="home-box home-imgBox">
                  <div className="box col-10">
                    <h4>
                      <div className="box-title">
                        {imageinfo.title}
                      </div>
                    </h4>
                    <div className="box-content">{imageinfo.text}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="home-section home-section-color">
        <div className="home-box bg-body-secondary">
          <div className="box col-10">
            <h4>
              <div className="box-title">
                Lorem ipsum.
              </div>
            </h4>
            <div className="home-subContent">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et.
            </div>
            <div className="box-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, quam ullam? Quae rem voluptatum impedit quas, incidunt, veritatis repellat consequatur obcaecati, voluptates possimus eligendi ducimus? Eius soluta tempore cupiditate et.
            </div>
            <div className="box-input">
                <Input
                  register={register} errors={errors} id="email" labelText="" type="email" />
                <button type='button' className='btn btn-primary'>
                  subscription
                </button>
              </div>
          </div>
        </div>
      </section>
    </div >
  );
}

export default Home;