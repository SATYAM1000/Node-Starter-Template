module.exports = {
    extends: ["@commitlint/cli", "@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert"
            ]
        ],
        "subject-case": [2, "always", "sentence-case"],
        "scope-case": [2, "always", "lower-case"],
        "scope-empty": [2, "never"],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never"],
        "header-max-length": [2, "always", 72],
    }
}

// Example commit messages: 
// 1. feat(api): Add user registration endpoint
// 2. fix(frontend): Resolve issue with form validation

