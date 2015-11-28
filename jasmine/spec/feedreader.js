/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions, the
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined and that
         * the URL is not empty.
         */
         it('has URL', function(){
            var feedLength = allFeeds.length;
            for (var i = 0; i < feedLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* This test loops through each feed in the allFeeds
         * object and ensures it has a name defined and that
         * the name is not empty.
         */
        it('has name', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* This suite tests the menu's functionailty */
    describe('The menu', function() {
        /* This test ensures the menu element is hidden by default.
         */
        it('is hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes visibility when the
          * menu icon is clicked. This test has two expectations:
          * does the menu display when clicked and does it hide
          * when clicked again.
          */
         it('toggles visibility', function(){
            var menuIcon = $('.menu-icon-link');

            /* The first click shows the menu. */
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /* The second click hides the menu. */
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
     });

    /* This suite tests the initial entries loaded. */
    describe('Initial Entries', function(){
        /* This test ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container. loadFeed() is asynchronous.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('has entry', function(){
            expect($('article').hasClass('entry')).toBe(true);
        });

    });

    /* This suite tests selection of a new feed. */
    describe('New Feed Selection', function(){
        /* This test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. loadFeed() is
         * asynchronous.
         */
        var startingHeader,
            updatedHeader;

        beforeEach(function(done){
            loadFeed(0, function(){
                startingFeed = $('.feed').html();
                done();
            });
        });

        it('changes content', function(done){
            loadFeed(1, function(){
                updatedFeed = $('.feed').html();
                expect(updatedFeed).not.toBe(startingFeed);
                done();
            });
        });

    });

    /* This suite could be used to test an 'Add Feed' button
     * if one is added in the future.
     */
    describe('Add New Feed', function(){
        // The number of feeds before adding one.
        var initialFeeds = allFeeds.length;

        // This test ensures that the new feed has been given a name.
        it('has name', function(){
            expect($('#feedName').length.not.toBe(0));
        });

        // This test ensures that the new feed has been given a URL.
        it('has URL', function(){
            expect($('#feedUrl').length.not.toBe(0));
        });

        /* This test ensures that the number of feed has increased
         * after the new feed information has been submitted.
         */
        it('adds feed', function(){
            addFeed($('#feedName').val(), $('#feedUrl').val());
            var updatedFeeds = allFeeds.length;
            expect(updatedFeeds.not.toBe(initialFeeds));
        });
    });


}());
