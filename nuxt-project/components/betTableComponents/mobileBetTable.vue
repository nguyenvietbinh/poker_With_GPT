<template>
    <div class="h-[150vh] w-[100vw] bg-blue-800 absolute">
        <div class="w-full h-[10vh] absolute">
            <NuxtLink to="/">
                <img src="/img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[5vw] top-[50%] translate-y-[-50%]">
            </NuxtLink>
            <img src="/img/pause.png" alt="" class="h-[40px] cursor-pointer w-auto absolute right-[5vw] top-[50%] translate-y-[-50%]">
        </div>
        <div style="" class="h-[98vw] w-[98vw] absolute left-[50%] top-[10vh] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="h-[96%] w-[96%] absolute top-[2%] left-[2%]">
                <div class="h-[25%] w-[50%] absolute bottom-0 left-[25%]">
                    <div class="text-white absolute">0</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
                <div class="h-[25%] w-[50%] absolute rotate-90 bottom-[12.5%] left-[-12.5%]">
                    <div class="text-white absolute">1</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
                <div class="h-[25%] w-[50%] absolute rotate-90 top-[12.5%] left-[-12.5%]">
                    <div class="text-white absolute">2</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
                <div class="h-[25%] w-[50%] absolute rotate-180 top-0 left-[25%]">
                    <div class="text-white absolute">3</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
                <div class="h-[25%] w-[50%] absolute -rotate-90 top-[12.5%] right-[-12.5%]">
                    <div class="text-white absolute">4</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
                <div class="h-[25%] w-[50%] absolute -rotate-90 bottom-[12.5%] right-[-12.5%]">
                    <div class="text-white absolute">5</div>
                    <div class="avatar w-[10vw] absolute left-[5vw] top-[5vw]">
                        <img src="/img/avt.png" alt="" class="rounded-full">
                    </div>
                </div>
            </div>
            <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
                <button class="btn btn-error h-full w-[30%] mt-2 absolute left-0">Fold/Check</button disabled="true" class=>
                <button class="btn btn-warning h-full w-[30%] mt-2 absolute left-[35%]">Call</button disabled="true" class=>
                <input type="number" placeholder="Raise" id="" class="h-full input input-success input-bordered w-[30%] mt-2 absolute right-0 bg-green-800 rounded-md">
            </div>
        </div>
    </div>
</template>


<style>

</style>