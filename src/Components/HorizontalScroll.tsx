import Card from './Card';




const HorizontalScroll = ({ data, heading }: { data: any; heading: string }) => {
    console.log(data);  // Make sure to log the correct data
    return (
        <div className="container mx-auto px-3 my-10">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">{heading}</h2>
            <div className="overflow-hidden">
                <div className="grid grid-cols-[repeat(auto-fit,220px)] grid-flow-col overflow-x-scroll gap-8">
                    {data.map((item: any, index: number) => (
                        <Card key={item.id + "heading" + index} data={item} index={index + 1} trending={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default HorizontalScroll