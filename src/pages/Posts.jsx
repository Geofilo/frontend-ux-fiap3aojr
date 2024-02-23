import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { client } from "../lib/createClient";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
    useParams,
    Link
} from "react-router-dom";

export const Posts = () => {
    const { pageNum } = useParams();

    const [posts, setPosts] = useState([]);
    const ITENS_BY_PAGE = 3;

    const [postsByPage, setPostsByPage] = useState([]);

    useEffect(() => {
        client
            .getEntries({
                content_type: 'blogPostAula',
                limit: 100,
                order: "-sys.createdAt"
            })
            .then(function (entries) {
                console.log('posts', entries.items);
                setPosts(entries.items);
                setPostsByPage(entries.items.slice((pageNum -1)* ITENS_BY_PAGE, ITENS_BY_PAGE * pageNum));
                console.log(postsByPage);
            });
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h1 className="my-3">Últimos posts</h1>

                        {postsByPage.map(post => (
                            <div className="card mb-3" key={post.sys.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.fields.postTitle}</h5>
                                    <p className="card-text">{post.fields.postDescription}</p>
                                    <Link to={`/posts/${post.fields.postSlug}`} className="card-link">
                                        Ver post
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </Layout>
    );
}