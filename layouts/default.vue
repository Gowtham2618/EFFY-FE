<template>
    <div>
        
        <div class="container-fluid">
            <NavBar />
            <div class="row p-5">
                <!-- <div class="col-md-2 col-sm-12">
                    <SideBar />
                </div> -->
                <div class="col-md-12 col-sm-12">
                    <Nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "EFFY",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Survey Module",
                },
            ],
            script: [
                {
                    type: "text/javascript",
                    charset: "utf-8",
                },
                {
                    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
                    body: true,
                },
                {
                    src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js",
                    body: true,
                },
                {
                    src: "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
                    body: true,
                },
                
            ],
            link: [
                {
                    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
                    rel: "stylesheet",
                },
                {
                    href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css",
                    rel: "stylesheet",
                },
                {
                    href: "https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap",
                    rel: "stylesheet",
                },

                {
                    href: "https://fonts.googleapis.com/css2?family=Bree+Serif&family=Rancho&display=swap",
                    rel: "stylesheet",
                },
                {
                    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Vollkorn:wght@500&display=swap",
                    rel: "stylesheet",
                },
            ],
        };
    },
}
</script>

<style>
/* .container-fluid {
    font-family: 'Poppins', sans-serif;
} */


</style>