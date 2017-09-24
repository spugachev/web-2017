#include <emscripten/bind.h>

using namespace emscripten;

class MyClass {
    public:
        MyClass(int x, std::string y): x(x), y(y)
        {}

        void incrementX() {
            ++x;
        }

        int getX() const { return x; }
        void setX(int x_) { x = x_; }

        static std::string getStringFromInstance(const MyClass& instance) {
            return instance.y;
        }

    private:
        int x;
        std::string y;
};

// Binding code
EMSCRIPTEN_BINDINGS(MyClass) {
  class_<MyClass>("MyClass")
    .constructor<int, std::string>()
    .function("incrementX", &MyClass::incrementX)
    .property("x", &MyClass::getX, &MyClass::setX)
    .class_function("getStringFromInstance", &MyClass::getStringFromInstance);
}