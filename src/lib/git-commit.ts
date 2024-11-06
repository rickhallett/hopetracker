// git-commit.ts
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function gitCommitAndPush(
  message: string = "",
  branch?: string
): Promise<string> {
  try {
    const { stdout: addOutput, stderr: addError } = await execAsync(
      "git add ."
    );
    if (addError) throw new Error(`Git add error: ${addError}`);

    const timestamp = new Date().toISOString();
    const commitMessage = `[${timestamp}] ${message}`;

    const { stdout: commitOutput, stderr: commitError } = await execAsync(
      `git commit -m "${commitMessage}"`
    );
    if (commitError) throw new Error(`Git commit error: ${commitError}`);

    const pushBranch = branch || (await getCurrentBranch());

    const { stdout: pushOutput, stderr: pushError } = await execAsync(
      `git push origin ${pushBranch}`
    );
    if (pushError) throw new Error(`Git push error: ${pushError}`);

    console.log("✅ Git operations completed successfully!");
    console.log(`📝 Commit message: ${commitMessage}`);
    console.log(`🌿 Pushed to branch: ${pushBranch}`);

    return "Success";
  } catch (error) {
    console.error("❌ Git operation failed:", error);
    process.exit(1);
  }
}

async function getCurrentBranch(): Promise<string> {
  const { stdout, stderr } = await execAsync("git rev-parse --abbrev-ref HEAD");
  if (stderr) throw new Error(`Failed to get current branch: ${stderr}`);
  return stdout.trim();
}

// Get command line arguments
const message = process.argv[2] || "";
const branch = process.argv[3];

// Run the function
gitCommitAndPush(message, branch);
