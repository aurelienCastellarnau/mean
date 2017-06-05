

(function () {
    const ESClient = require('./utils/elasticsearch.js'),
        Cases = require('./models/casesModel.js');
    /*
    ESClient.indices.delete({
        index: 'cases'
    }, function (err, res) {
        if (err)
            console.log(err)
        else {
    */
    //    console.log("[elastic] index cases deleted")



    Cases.find({}, { '_id': 0 }, function (err, c) {// { '_id': 0 },
        if (err) {
            console.log("[ES in /cases routes] indexation error: ", err)
        } else {
            for (let key in c) {
                ESClient.index({
                    index: 'cases',
                    id: key,
                    type: 'cases',
                    body: c[key]
                }, function (err, resp, status) {
                    //console.log("[ElasticSearch Cases indexation: ", resp)
                });
            }
        }
    }).limit(100)
})();
 //   }
//})