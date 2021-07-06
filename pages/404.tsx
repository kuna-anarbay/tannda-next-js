export default function NotFoundPage() {

    return (
        <div className={"p-8"}>
            <div className={"flex items-center h-full justify-center rounded-lg border border-border py-12 px-4"}>
                <div className={"text-center"}>
                    <h1 className={"text-largeTitle font-semibold"}>
                        404
                    </h1>
                    <h2 className={"text-title2 font-medium text-label"}>
                        Страница не найдена
                    </h2>
                </div>
            </div>
        </div>
    )
}
