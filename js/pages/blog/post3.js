

const ays_div_ids = ['ays-test-1', 'ays-test-2', 'ays-test-3', 'ays-test-4', 'ays-test-5', 'ays-test-6'];
const ays_lora_div_ids = ['ays-lora-1', 'ays-lora-2', 'ays-lora-3', 'ays-lora-4', 'ays-lora-5'];

addAysTestComparisons();
addAysLoraComparisons();
configureAllComparisonSliders();
loadInComparisonSliderImages();


function configureAllComparisonSliders() {
    for (let i = 0; i < ays_div_ids.length; i++) {
        let ays_div = document.getElementById(ays_div_ids[i]);
        configureComparisonSlider(ays_div);
    }

    for (let i = 0; i < ays_lora_div_ids.length; i++) {
        let ays_lora_div = document.getElementById(ays_lora_div_ids[i]);
        configureComparisonSlider(ays_lora_div);
    }
}

function addAysLoraComparisons() {
    let blue_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_non_ays.png";
    let blue_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_ays.png";

    let black_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/black_jacket_non_ays.png";
    let black_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/black_jacket_ays.png";

    let red_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/red_jacket_non_ays.png";
    let red_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/red_jacket_ays.png";

    let green_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_non_ays.png";
    let green_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_ays_img2img.png";
    // green img2img src: https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/green_jacket_ays_img2img.png

    let orange_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_non_ays.png";
    let orange_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_ays_img2img.png";
    // onrage non-ays img2img src: https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/orange_jacket_non_ays_img2img.png

    let blue_comp_html = comparisonElementHTML(blue_before, blue_after);
    let blue_comp_div = $($.parseHTML(blue_comp_html));

    let black_comp_html = comparisonElementHTML(black_before, black_after);
    let black_comp_div = $($.parseHTML(black_comp_html));

    let red_comp_html = comparisonElementHTML(red_before, red_after);
    let red_comp_div = $($.parseHTML(red_comp_html));

    let green_comp_html = comparisonElementHTML(green_before, green_after);
    let green_comp_div = $($.parseHTML(green_comp_html));

    let orange_comp_html = comparisonElementHTML(orange_before, orange_after);
    let orange_comp_div = $($.parseHTML(orange_comp_html));

    $('#ays-lora-1').append(blue_comp_div);
    $('#ays-lora-2').append(black_comp_div);
    $('#ays-lora-3').append(red_comp_div);
    $('#ays-lora-4').append(green_comp_div);
    $('#ays-lora-5').append(orange_comp_div);
}

function addAysTestComparisons() {
    let ays_1_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-1.png";
    let ays_1 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-1.png";

    let ays_2_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-2.png";
    let ays_2 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-2.png";

    let ays_3_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-3.png";
    let ays_3 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-3.png";

    let ays_4_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-4.png";
    let ays_4 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-4.png";

    let ays_5_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-5.png";
    let ays_5 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-5.png";

    let ays_6_reg = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-reg-6.png";
    let ays_6 = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/ays-6.png";

    let ays_1_comp_html = comparisonElementHTML(ays_1_reg, ays_1);
    let ays_1_comp_div = $($.parseHTML(ays_1_comp_html));

    let ays_2_comp_html = comparisonElementHTML(ays_2_reg, ays_2);
    let ays_2_comp_div = $($.parseHTML(ays_2_comp_html));

    let ays_3_comp_html = comparisonElementHTML(ays_3_reg, ays_3);
    let ays_3_comp_div = $($.parseHTML(ays_3_comp_html));

    let ays_4_comp_html = comparisonElementHTML(ays_4_reg, ays_4);
    let ays_4_comp_div = $($.parseHTML(ays_4_comp_html));

    let ays_5_comp_html = comparisonElementHTML(ays_5_reg, ays_5);
    let ays_5_comp_div = $($.parseHTML(ays_5_comp_html));

    let ays_6_comp_html = comparisonElementHTML(ays_6_reg, ays_6);
    let ays_6_comp_div = $($.parseHTML(ays_6_comp_html));

    $('#ays-test-1').append(ays_1_comp_div);
    $('#ays-test-2').append(ays_2_comp_div);
    $('#ays-test-3').append(ays_3_comp_div);
    $('#ays-test-4').append(ays_4_comp_div);
    $('#ays-test-5').append(ays_5_comp_div);
    $('#ays-test-6').append(ays_6_comp_div);
}

function loadInComparisonSliderImages() {
    for (let i = 0; i < ays_div_ids.length; i++) {
        loadComparisonImgs(ays_div_ids[i]);
    }

    for (let i = 0; i < ays_lora_div_ids.length; i++) {
        loadComparisonImgs(ays_lora_div_ids[i]);
    }
}

function loadComparisonImgs(comparison_id) {
    let comparison = document.getElementById(`${comparison_id}`);
    let image_before = comparison.querySelector('.image-before');
    var true_src = image_before.getAttribute('true_src');

    let actualImage_1 = new Image();
    actualImage_1.onload = function() {
        image_before.src = this.src;
    };
    actualImage_1.src = true_src;

    let image_after = comparison.querySelector('.image-after');
    true_src = image_after.getAttribute('true_src');

    let actualImage2 = new Image();
    actualImage2.onload = function() {
        image_after.src = this.src;
    };
    actualImage2.src = true_src;
}