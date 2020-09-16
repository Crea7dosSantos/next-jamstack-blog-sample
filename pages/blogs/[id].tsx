import fetch from 'isomorphic-unfetch'

const BlogId = ({ blog }) => {
    return (
        <div>
            <h1>{blog.title}</h1>
            <div>
                <p>記事作成日時: {blog.created_at}</p>
                <p>{blog.body}</p>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY }
    }
    const res = await fetch(
        'https://next-jamstack.microcms.io/api/v1/blogs',
        key
    )
    const repos = await res.json()
    console.log(repos)

    const paths = repos.contents.map(repo => `/blogs/${repo.id}`)
    return { paths, fallback: false }
}

export const getStaticProps = async context => {
    const id = context.params.id

    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY }
    }
    const res = await fetch(
        `https://next-jamstack.microcms.io/api/v1/blogs/${id}`,
        key
    )
    const blog = await res.json()

    return {
        props: {
            blog: blog
        }
    }
}

export default BlogId

