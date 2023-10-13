package com.pbl6.dictionaryappbe.controller;

import com.pbl6.dictionaryappbe.dto.CreationVocabLeitnerRequestDto;
import com.pbl6.dictionaryappbe.service.LeitnerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Leitner")
@RestController
@RequestMapping("/leitners")
@RequiredArgsConstructor
public class LeitnerController {
    private final LeitnerService leitnerService;

    @Operation(summary = "Add vocabulary to Leitner")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Add vocabulary to leitner successfully",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid data")})
    @PostMapping
    public ResponseEntity<String> addVocabLeitner(@Valid @RequestBody CreationVocabLeitnerRequestDto leitnerRequestDto) {
        leitnerService.addVocabToLeitner(leitnerRequestDto);
        return new ResponseEntity<>("Add vocabulary to leitner successfully", HttpStatus.CREATED);
    }
}
