<template>
    <div class="h-[100vh] w-[100vw] bg-blue-800 absolute">
        <div class="w-full h-[10vh] absolute">
            <NuxtLink to="/">
                <img src="/img/logo.png" alt="" class="logo h-[50px] cursor-pointer w-auto absolute left-[5vw] top-[50%] translate-y-[-50%]">
            </NuxtLink>
            <img src="/img/pause.png" alt="" class="h-[40px] cursor-pointer w-auto absolute right-[5vw] top-[50%] translate-y-[-50%]">
        </div>
        <div style="" class="h-[98vw] w-[98vw] absolute left-[50%] top-[10vh] translate-x-[-50%]">
            <img src="/img/pokerTable.png" alt="" class="h-full w-full rounded-[2vh] absolute">
            <div class="w-full h-[7.5vh] absolute bottom-[-7.5vh]">
                <div class="btn btn-error h-full w-[30%] mt-2 absolute left-0">Fold</div>
                <div class="btn btn-error h-full w-[30%] mt-2 absolute left-[35%]">Fold</div>
                <div class="btn btn-error h-full w-[30%] mt-2 absolute right-0">Fold</div>
            </div>
        </div>
    </div>
</template>


<style>

</style>