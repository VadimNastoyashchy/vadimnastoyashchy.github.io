---
title: "Automating JavaScript Library Deployment to NPM with GitHub Actions. A Step-by-Step Guide"
image: /assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp
excerpt: "This article is useful for test automation engineers or developers who are using JavaScript in their code and want to publish their library to the NPM repository and use it as a dependency in other projects. There are two different ways of publishing. The first is locally using npm commands in the terminal, and the other is an automated process using CI/CD configuration for building and publishing."
date: 2024-01-12 20:00:00 +01:00
last_modified_at: 2024-01-12 20:00:00 +01:00
tags:
  - JavaScript
  - Github Actions
---

---
layout: post
title: Automating JavaScript Library Deployment to NPM with GitHub Actions. A Step-by-Step Guide
---

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_9BY0h3oT-oe4eDAx.webp){: .align-center .border .max-width-300px}

This article is useful for test automation engineers or developers who are using JavaScript in their code and want to publish their library to the NPM repository and use it as a dependency in other projects. There are two different ways of publishing. The first is locally using npm commands in the terminal, and the other is an automated process using CI/CD configuration for building and publishing.

Now we will explore the possibility of automatic deployment. First and foremost, we need a project that has already been created with npm requirements NPM docs and is hosted on GitHub.

For example, let’s consider the test runner library: https://github.com/VadimNastoyashchy/real-test-js. To get started, we need to sign in or sign up to the npm repository and create a new npm access token for publishing a package using GitHub Actions. Create a new access token on npmjs.com for Automation and copy it for the next step.

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_P6y9PHlQzynkf0pb.webp){: .align-center .border .max-width-300px}

Save the npm access token as a GitHub secret. We will save the generated token for GitHub Actions as a repository secret. In your GitHub repository settings, go to “Secrets”, then “Actions”, then click on the “New repository secret” and add the npm access token that has been created in the previous step. We will name this secret NPMJS_ACCESS_TOKEN.

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_R8ZvWyFGF2X4suGO.webp){: .align-center .border .max-width-300px}

Also, select “Allow GitHub actions to create and approve pull requests” and “Read and write permissions” in the Workflow permissions sections, and then add the GitHub workflow to your repository.

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_d08uChxc0IHBWLWt.webp){: .align-center .border .max-width-300px}

In your project, create a new GitHub workflow file named release_npm_package.yml in the .github/workflows directory.

```
name: Release npm package
on:
  workflow_dispatch:
    inputs:
      release-type:
        type: choice
        required: true
        description: 'Release type:'
        default: 'patch'
        options:
          - 'patch'
          - 'minor'
          - 'major'
          - 'prepatch'
          - 'preminor'
          - 'premajor'
          - 'prerelease'
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          registry-url: https://registry.npmjs.org/
          node-version: '14'
      - name: Git configuration
        run: |
          git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git config --global user.name "GitHub Actions"
      - name: Bump release version
        if: startsWith(github.event.inputs.release-type, 'pre') != true
        run: |
          echo "NEW_VERSION=$(npm --no-git-tag-version version $RELEASE_TYPE)" >> $GITHUB_ENV
          echo "RELEASE_TAG=latest" >> $GITHUB_ENV
        env:
          RELEASE_TYPE: ${{ github.event.inputs.release-type }}
      - name: Bump pre-release version
        if: startsWith(github.event.inputs.release-type, 'pre')
        run: |
          echo "NEW_VERSION=$(npm --no-git-tag-version --preid=beta version $RELEASE_TYPE
          echo "RELEASE_TAG=beta" >> $GITHUB_ENV
        env:
          RELEASE_TYPE: ${{ github.event.inputs.release-type }}
      - name: Update changelog
        uses: superfaceai/release-changelog-action@v1
        with:
          path-to-changelog: CHANGELOG.md
          version: ${{ env.NEW_VERSION }}
          operation: release
      - name: Commit CHANGELOG.md and package.json changes and create tag
        run: |
          git add "package.json"
          git add "CHANGELOG.md"
          git commit -m "chore: release ${{ env.NEW_VERSION }}"
          git tag ${{ env.NEW_VERSION }}
      - name: Publish
        run: yarn publish --verbose --access public --tag ${{ env.RELEASE_TAG }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - name: Push changes to repository
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git push origin && git push --tags
      - id: get-changelog
        name: Get version changelog
        uses: superfaceai/release-changelog-action@v1
        with:
          path-to-changelog: CHANGELOG.md
          version: ${{ env.NEW_VERSION }}
          operation: read
      - name: Update GitHub release documentation
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ env.NEW_VERSION }}
          body: ${{ steps.get-changelog.outputs.changelog }}
          prerelease: ${{ startsWith(github.event.inputs.release-type, 'pre') }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Before you proceed to trigger a new npm release, add changes to the CHANGELOG.md file. Our workflow requires that you follow the “keep a changelog” convention.

You can start with a sample:

```
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

```

To trigger the npm release, go to Actions, select our release workflow, and click on the “Run workflow” button. You can select from the available list of options to set the release type.

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_2qeYLiBNf7GNQUjQ.webp){: .align-center .border .max-width-300px}

After successful completion of the workflow, the release will look like the following:

![_config.yml]({{ site.url }}/assets/images/posts/js-library/0_oRJyBssDC0BpAzj-.webp){: .align-center .border .max-width-300px}

And it will be available in the NPM repository as well.

Sources used in the article:

Official documentation Github, NPM,

https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages

https://keepachangelog.com/en/1.0.0/

https://superface.ai/blog/npm-publish-gh-actions-changelog