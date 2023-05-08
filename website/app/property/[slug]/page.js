import APIService from "@/lib/APIService"
import { MEDIA_BASE_URL } from "@/lib/constants";
import { getStrapiMedia } from "@/lib/functions";
import { get } from "lodash";
import ReactMarkdown from "react-markdown";



const fetchPropery = async (config) => {
    const res = await APIService.get('/properties', config);
    return get(res, 'data.data') || []
}

export const generateMetadata = async ({ params }) => {
    const { slug = '' } = params || {}
    const [property] = await fetchPropery({
        params: {
            filters: {
                slug: { '$eq': slug },
            }
        }
    })
    return {
        title: get(property, 'attributes.title'),
        description: get(property, 'attributes.description'),
    }
};


const Page = async ({ params }) => {
    const { slug = '' } = params || {}
    const [property] = await fetchPropery({
        params: {
            filters: {
                slug: { '$eq': slug },
            },
            populate: "*",
        }
    })
    const propertyDetails = get(property, 'attributes')

    const metaData = [
        {
            icon: 'bi bi-geo-alt',
            text: [get(propertyDetails, 'address.locality', ''), get(property, 'attributes.address.city', '')].join(', ')
        },
        {
            icon: 'bi bi-house',
            text: get(propertyDetails, 'futures.bedroom') + ' BHK',
        },
        {
            icon: 'bi bi-bounding-box-circles',
            text: get(propertyDetails, 'futures.area'),
        },
    ]

    return (
        <>
            <main id="main">
                <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: `url(${getStrapiMedia(get(propertyDetails, 'heroImage')) || '/assets/img/breadcrumbs-bg.jpg'})` }}>
                    <div className="container position-relative d-flex flex-column align-items-center" >

                        <h2>{get(propertyDetails, 'title')}</h2>
                        <ol>
                            <li>{get(propertyDetails, 'address.locality')}, {get(propertyDetails, 'address.city')}</li>
                        </ol>
                    </div>
                </div>
            </main>

            <section id="blog" className="blog">
                <div className="container" >

                    <div className="row g-5">

                        <div className="col-lg-8">

                            <article className="blog-details">

                                <div className="post-img">
                                    <img src={getStrapiMedia(get(propertyDetails, 'heroImage'))} alt="" className="img-fluid" />
                                </div>

                                <h2 className="title">{get(propertyDetails, 'description')}</h2>

                                <div className="meta-top">
                                    <ul>
                                        {metaData.map((item, inx) => {
                                            return (
                                                <li className="d-flex align-items-center" key={inx}>
                                                    <i className={item.icon}></i>
                                                    {item.text}
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </div>

                                <ReactMarkdown className="content" >{get(propertyDetails, 'content')}</ReactMarkdown>

                            </article>
                        </div>
                        <div className="col-lg-4">
                            <h3>Related Properties</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section id="projects" className="projects">
                <div class="container">

                    <div class="section-header">
                        <h2>ELEVATION VIEW</h2>
                    </div>

                    <div class="portfolio-isotope" >

                        <div class="row gy-4 portfolio-container">

                            {
                                (get(propertyDetails, 'images.data') || []).map(media => {
                                    return (
                                        <div class="col-lg-4 col-md-6 portfolio-item filter-remodeling" key={media.id}>
                                            <div class="portfolio-content h-100">
                                                <img src={`${MEDIA_BASE_URL}${get(media, 'attributes.url')}`} class="img-fluid" alt="" />
                                                <div class="portfolio-info">
                                                    {/* <h4>Remodeling 1</h4>
                                            <p>Lorem ipsum, dolor sit amet consectetur</p> */}
                                                    <a href={`${MEDIA_BASE_URL}${get(media, 'attributes.url')}`} title="Remodeling 1" data-gallery="portfolio-gallery-remodeling" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page