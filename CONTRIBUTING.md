# Contributing to SimpleMaskMoney

🎉 First off, thanks for taking the time to contribute! 🎉

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## 💪 How Can I Contribute

* [🐛 Reporting Bugs](#-reporting-bugs)
* [📥 Suggesting Enhancements](#-suggesting-enhancements)
* [🔀 Pull Requests](#-pull-requests)

## 🐛 Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list]() as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](ISSUE_TEMPLATE.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

### 📥 Suggesting Enhancements

This section guides you through submitting an enhancement tip to SimpleMaskMoney, including completely new features and small improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion 📝 and find related suggestions 🔎. When you are creating a suggestion for improvement, include as many details as possible. Fill out the template, including the steps you imagine you would make if the feature you were requesting existed.

## 💅 Styleguides

Here are some guides to names and patterns which helps everybody understand contribuitions.

### 🌿 Branch names

* The branch name starts with [feat, fix, docs, test, chore, refactor] using lowercase
* Followed by a slash / and the [Issue ID]()
* Then a slash / and a short name limited to 8 words and 45 characters using using kebab-case

Take a look at some examples:

* `refactor/#666/remove-bad-code`
* `feat/#999/add-path-to-hell`
* `fix/#666/rollback-path-hell`
* `doc/#123/add-lessons-learned`

### 💬 Git Commit Messages

* When only changing documentation, include `[ci skip]` in the commit title

* Limit the first line to 72 characters or less

* Use the present tense ("Add feature" not "Added feature")

* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")

* (optional) Reference issues and pull requests liberally after the first line

* Try starting your message with an action like [`add`, `remove`, `create`, `delete`, `fix`, `refactor`, `improve`]

* Consider starting the commit message with an applicable emoji [full list here](https://gitmoji.dev/):
  * 🆕 :new: when adding code or file(s)
  * 💩 :poop: when adding code or file(s) that needs refactor later
  * 🎨 :art: when improving the format/structure of the code
  * 📝 :memo: when writing docs
  * 🚚 :truck: when renaming or fixing semantic errors
  * 🚧 :construction: when adding an incomplete code
  * 🐛 :bug: when fixing a bug
  * 🔥 :fire: when removing code or file(s)
  * 🧪 :test_tube: when adding tests
  * ➕ :heavy_plus_sign: when adding dependencies
  * ⬆️ :arrow_up: when upgrading dependencies
  * ⬇️ :arrow_down: when downgrading dependencies
  * ❌ :x: when removing dependencies
  * 🚨 :rotating_light: when improving or fixing linters

## 🔀 Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Run the lint command before commit `npm run lint`.
* Include thoughtfully-worded, well-structured [Jest]() specs in the `./tests` folder. Run them using `npm run test`.
* Document new code the best way possible.
* End all files with a newline

Take a look at some examples:

* `🆕 add new option`
* `➕ add tool to test performance`
* `⬆️ upgrade xpto dependecy to fix security issue`
* `🐛 fix bug when type so fast`
