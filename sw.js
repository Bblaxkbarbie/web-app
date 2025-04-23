//this variable has been created as we will likely use it more than once on this file so it will save space
const staticCacheName = 'site-static-v2';

//dynamic cache variable
const dynamicCacheName = 'site-dynamic-v2';


//this array variable  i am going to reference with the cache assets
const assets = [
    '/',
    //Call all the HTML, CSS and JS pages
    '/pages/fallback.html'
]



//Install the SW (Event)
self.addEventListener('install', evt => {
    evt.waitUntil(          //wait until, so we dont class the SW as installed before we have finished caching.
        caches.open(staticCacheName).then((cache) => {      //it will check if i existys first and if not it will crearte it and open it. This is a sync task and will take time
            console.log('caching shell assets');                            //console log for debugging
            return cache.addAll(assets);                                                   //add the assets we have added to our array
            // .addALL is an array method we are using, we could also use the .add method for single elements
        })
    );
    // console.log('service worker installed');
});


//Activate event(listening)
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => {
                    return key !== staticCacheName && key !== dynamicCacheName;
                }).map(key => caches.delete(key))
            );
        })
    );
    // console.log('service worker activated')
})

//fetch events
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(        //use a respond-with function
        caches.match(evt.request).then(cacheRes => {         //check if the request matches one of our cache elements
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes
                })
            }) ;         //if it does return the elements OR return/continue with our fetch request
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1){
                return caches.match('/pages/fallback.html') 
            }
            if (evt.request.url.indexOf('.png') > -1){
                return caches.match('/')//icon 128px
            }
        }
    )
)
});



