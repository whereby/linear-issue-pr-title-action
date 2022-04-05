import * as core from '@actions/core';
import * as github from '@actions/github';

export function run(): void {
    try {
        core.info('Starting PR Title check for Linear Issue Key');
        const title: string | undefined = github.context.payload.pull_request?.title;

        if (!title) {
            core.debug(`Pull Request: ${JSON.stringify(github.context.payload.pull_request)}`);
            throw new Error('No title for pull request in webhook payload event!');
        }

        const regex = getRegex();

        core.debug(regex.toString());

        if (!regex.test(title)) {
            core.debug(`Regex ${regex.toString()} failed with title ${title}`);
            core.info('Title Failed!');
            core.setFailed('PullRequest title does not start with a Jira Issue key.');
            return;
        }

        core.info('Title Passed');
        return;
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

export function getRegex(): RegExp {
    let issueKeyRegex = /^([A-Z][A-Z])-\d*/;
    const projectKey: string = core.getInput('projectKey', { required: false });


    if (projectKey || projectKey !== '') {
        core.debug(`Project Key is ${projectKey}`);
        const projectKeyRegex = /^([A-Z][A-Z])/;

        if (!projectKeyRegex.test(projectKey)) {
            throw new Error(`Project Key ${projectKey} is invalid`);
        }

        issueKeyRegex = new RegExp(`/^${projectKey}-\d*/`);
    }

    core.debug(`Regex is ${issueKeyRegex.toString()}`);

    return issueKeyRegex;
}

run();
