export const PostJobFormSteps = ({steps}:{steps:string[]}) => {
    return (
        <div className="flex flex-col gap-6 p-4 bg-background rounded-lg">
            {
                steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full p-4 border-2 border-muted flex items-center justify-center">
                            <p className="text-base font-medium">{index + 1}</p>
                        </div>
                        <p className="text-base font-medium">{step}</p>
                    </div>
                ))
            }
        </div>
    )
}