const iQAirService = require('./../../services/iQAirService');
const sqliteConnection = require('./../../database/sqliteConnection');
const promiseUtil = require('../../utils/promiseUtil');

describe('Test iQAir service', () => {
    beforeEach(() => {
        require('../../database/initSqliteSchema');
    });

    test('test getIQAirPollutionByLatLng method', async () => {
        const lat = 48.856613;
        const lng = 2.352222;

        const p = await iQAirService.getIQAirPollutionByLatLng(lat, lng);

        expect(p).toEqual(
            expect.objectContaining({
                ts: expect.any(String),
                aqius: expect.any(Number),
                mainus: expect.any(String),
                aqicn: expect.any(Number),
                maincn: expect.any(String),
            })
        );
    });

    test('test saveIQAirPollution method', async () => {
        const lat = 48.856613;
        const lng = 2.352222;

        const getCount = async () => new Promise((resolve, reject) => {
            sqliteConnection.get('SELECT COUNT(*) AS count FROM pollutions', (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            })
        });

        const countBeforeSave = await getCount();

        await iQAirService.saveIQAirPollution(lat, lng);

        const countAfterSave = await getCount();

        expect(countBeforeSave).toEqual(countAfterSave - 1);
    });

    test('test getMostPollutedDatetime method', async () => {
        const savePollution = async (poll) => new Promise((resolve, reject) => {
            const query = 'INSERT INTO pollutions (ts, aqius, mainus, aqicn, maincn, created_at) VALUES(?,?,?,?,?,?)';
            const value = [poll.ts, poll.aqius, poll.mainus, poll.aqicn, poll.maincn, poll.createdAt];

            sqliteConnection.run(query, value, function (err) {
                if (err) return reject(err);

                resolve();
            });
        });

        clearDB();

        const poll = {
            ts: "2022-09-22T15:00:00.000Z",
            aqius: 29,
            mainus: "p2",
            aqicn: 10,
            maincn: "p2",
            createdAt: "2022-09-22T15:04:00.000Z",
        };
        const toBeValue = "2022-09-22T15:03:00.000Z";

        await Promise.all([
            savePollution({ ...poll, aqius: 19, createdAt: "2022-09-22T15:01:00.000Z" }),
            savePollution({ ...poll, aqius: 29, createdAt: "2022-09-22T15:02:00.000Z" }),
            savePollution({ ...poll, aqius: 88, createdAt: toBeValue }),
            savePollution({ ...poll, aqius: 49, createdAt: "2022-09-22T15:04:00.000Z" }),
            savePollution({ ...poll, aqius: 59, createdAt: "2022-09-22T15:05:00.000Z" }),
        ]);

        const datetime = await iQAirService.getMostPollutedDatetime();

        expect(datetime).toBe(toBeValue);
    });

    function clearDB() {
        return new Promise((resolve, reject) => {
            sqliteConnection.run('DELETE FROM pollutions', function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }
});
