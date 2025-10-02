export default async function Array({ params }: unknown) {
    const array = await params.arr;
    console.log(array)
    return <div>
        Items = {JSON.stringify(array)}
    </div>
}