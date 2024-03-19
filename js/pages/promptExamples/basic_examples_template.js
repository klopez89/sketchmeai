function basicExamplesHTML() {
    return `
    <div class="bg-gray-100 h-full relative flex justify-center">
        <div id="collection-grid-container" class="absolute mx-auto max-w-4xl px-8 py-8 overflow-y-auto h-full w-full bg-gray-100 transform transition-all duration-200 ease-in-out">
            <div class="relative">
                <div id="collection-grid" role="list" class="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" @click.away="clickedOutsideOfCollectionGrid()" onclick="clickedOnEmptyPartOfGrid()">
                    <div id="new-model-button" class="relative rounded-lg overflow-hidden cursor-pointer" onclick="clickedOnNewModelButton(event)">
                        <div class="aspect-[1/1] bg-black hover:bg-gray-800">
                            <div class="flex justify-center items-center h-full text-white text-2xl">
                                Train<br>New Model
                            </div>
                        </div>
                    </div>
                </div>

                <div id="grid-loader" class="absolute top-0 left-0 w-full h-full">
                    <div class="bg-gray-100 w-full h-full flex justify-center items-start">
                        <div class="mt-5">
                            <i class="fa fa-spinner fa-spin text-4xl text-gray-500 mt-5" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div id="infiniteLoader" class="text-4xl text-gray-500 w-full flex bg-transparent flex flex-col items-center pt-6 pb-0 hidden">
                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                </div> 
            </div>
        </div>
    </div>
    `;
}