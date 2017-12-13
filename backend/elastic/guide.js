const client = require("../config/elasticsearch");

let exportedMethods = {
    createIndex() {
        client.indices.create({
            index: 'guide'
        }, function (err, resp, status) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("create", resp);
            }
        });
    },
    addGuide(guide) {
        client.index({
            index: 'guide',
            type: 'guideInfo',
            body: guide
        }, function (err, resp, status) {
            console.log(resp);
        });
    },
    updateGuide(id, guide) {
        searchForGuide(id)
        return client.update({
            index: 'guide',
            type: 'guideInfo',
            id: id,
            body: {
                guide
            }
        });
    },
    searchForGuide(keywords) {
        return client.search({
            q: keywords
        }).then(function (body) {
            var hits = body.hits.hits;
            return hits;
        }, function (error) {
            console.trace(error.message);
        });
    }
/*
    searchForGuideByCategory(keywords, category) {
        return client.search({
            index: 'guide',
            type: 'guideInfo',
            body: {
                query: {
                    match: {
                        Category: category
                    }
                }
            },
            q:keywords
        }).then(function (resp) {
            var hits = resp.hits.hits;
            return hits;
        }, function (err) {
            console.trace(err.message);
        });
    }*/
}
