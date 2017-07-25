let router = global.variables.router,
    Record = global.Record;

/**
 * @function create_record
 * @instance
 * @param {string} datetime Date and time [timestamp] (Required).
 * @param {string} category [Food|Education|Sport|...] (Required).
 * @param {string} card Card id (Required).
 * @param {string} value Money (Required).
 * @param {string} note Note (Option).
 * @param {string} picture Picture [Base64] (Option).
 * @example <caption>Requesting /v1/record/create with the following POST data.</caption>
 * {
 *  datetime: 1500879600,
 *  category: 'Food',
 *  card: 0c4f2df1-5229-406d-9548-337a2dcc6d15,
 *  value: 90000
 * }
 */
router.post("/record/create", (req, res) => {
    var datetime = req.body.datetime,
        category = req.body.category,
        card = req.body.card,
        value = req.body.value,
        note = req.body.note,
        picture = req.body.picture;

    if (
        !req.user
    ) return res.redirect("/");

    if (
        global.isEmpty(datetime, null) || 
        global.isEmpty(category, null) || 
        global.isEmpty(card, null) || 
        isNaN(parseInt(value))
    ) return global.errorHandler(res, 400, "Bad request.");

    new Record({
        datetime,
        category,
        card,
        value,
        note: note || "",
        picture: picture || ""
    })
    .save();

    return global.successHandler(res, 201, "The record was created successfully.");
});

/**
 * @function get_record_by_card_id
 * @instance
 * @param {string} id Id of card (Required).
 * @example <caption>Requesting /v1/records?id=0c4f2df1-5229-406d-9548-337a2dcc6d15 with the following GET data.</caption>
 */
router.get("/records", (req, res) => {
    var card = req.param("id");

    if (
        !req.user
    ) return res.redirect("/");

    if (
        global.isEmpty(card, null)
    ) return global.errorHandler(res, 400, "Bad request.");

    Record.aggregate([
        {
            $match: {
                card
            }
        },
        {
            $group: {
                _id: "$category", //GROUP BY QUERY.
                total: {
                    $sum: "$value"
                }
            }
        }
    ])
    .then(result => {
        return global.successHandler(res, 200, result);
    })
    .catch(error => {
        return global.errorHandler(res, 200, error);
    })
})

module.exports = router;