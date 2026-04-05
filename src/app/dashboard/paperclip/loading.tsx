export default function PaperclipLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-gray-100 rounded"></div>
              <div className="h-24 bg-gray-100 rounded"></div>
              <div className="h-24 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-100 rounded"></div>
              <div className="h-16 bg-gray-100 rounded"></div>
              <div className="h-16 bg-gray-100 rounded"></div>
              <div className="h-16 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
