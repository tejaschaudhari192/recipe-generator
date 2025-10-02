export default async function Id({ params }: unknown) {
    const id = await params.id;
    console.log(id)
    return <div>
        Id = {id}
    </div>
}