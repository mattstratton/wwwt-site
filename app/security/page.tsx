import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";

export default async function SecurityPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Security & Privacy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to view security and privacy information.
          </p>
          <SignIn />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Security & Privacy at {siteConfig.name}
            </h1>
          </div>
          
          <div className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              {/* Non-Technical Overview */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  How We Keep Your Content Private
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {siteConfig.name} is built with privacy and security as core principles. Our multi-layered
                  security approach ensures your content remains private and accessible only to authorized users.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Key Privacy Features
                  </h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Invitation-only access - no public sign-ups allowed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Authentication required for all content, including direct video links</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Secure video storage with no direct file access</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Technical Details */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Implementation
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For those interested in the technical details, here's an in-depth look at our security measures:
                </p>

                <div className="space-y-8">
                  {/* Storage Security */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Storage Security
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Private Amazon S3 bucket with no public access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Application-only access using secure AWS credentials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>No direct file access possible, even with known filenames</span>
                      </li>
                    </ul>
                  </div>

                  {/* Access Control */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Access Control
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Secure authentication through Clerk</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Authentication middleware protection on all pages and API routes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Encrypted session tokens with secure storage</span>
                      </li>
                    </ul>
                  </div>

                  {/* Video Streaming */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Secure Video Streaming
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Time-limited signed URLs with 1-hour expiration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>New signed URL generated for each video request</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Shared URLs become invalid after expiration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Authenticated video player requests</span>
                      </li>
                    </ul>
                  </div>

                  {/* Additional Security */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Additional Security Measures
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>HTTPS encryption for all communications</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Protected API routes with authentication checks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Optional video hiding with maintained direct access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 