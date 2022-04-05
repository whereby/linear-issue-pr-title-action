import * as github from '@actions/github';
import { readFileSync } from 'fs';
import { run, getRegex } from '../src';

describe('tests', () => {

    describe('getRegex', () => {
        const keyName = 'INPUT_PROJECTKEY';

        afterEach(() => {
            delete process.env[keyName]
        })

        it('gets the default when no project key is provided', () => {
            process.env[keyName] = '';

            const regex = getRegex();
            const defaultRegex = /^([A-Z][A-Z])-\d*/;

            expect(regex).toEqual(defaultRegex);
            expect(regex.test('PR-4 this is valid')).toBe(true);
        });

        it('uses a project key if it exists', () => {
            process.env[keyName] = 'AB';

            const regex = getRegex();

            expect(regex).toEqual(new RegExp('/^AB-\d*/'));
            expect(regex.test('AB-43 pull request title')).toBe(false);
        });

        it('throws an exception if the provided project key is not valid', () => {
            process.env[keyName] = 'Ab';
            expect(getRegex).toThrowError('Project Key Ab is invalid');
        });

        it('throws an exception if the provided project key is not valid', () => {
            process.env[keyName] = 'a1';
            expect(getRegex).toThrowError('Project Key a1 is invalid');
        });
    });

    describe('run', () => {

        beforeEach(() => {
            delete process.env['GITHUB_EVENT_PATH'];
        });

        it('can get the title from the context', () => {
            process.env['GITHUB_EVENT_PATH'] = __dirname + '/valid-context.json';

            github.context.payload = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));

            expect(run()).toEqual(undefined);
        });

        it('raises an exception if the event has invalid title', () => {
            process.env['GITHUB_EVENT_PATH'] = __dirname + '/invalid-context.json';

            github.context.payload = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));

            expect(run()).toEqual(undefined);
        });

        it('raises an exception if the event is not for a pull_request', () => {
            process.env['GITHUB_EVENT_PATH'] = __dirname + '/wrong-event-type-context.json';

            github.context.payload = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));

            try {
                run()
            } catch(error){
                expect(error).toEqual('No title for pull request in webhook payload event!');
            }
        });
    });
});
